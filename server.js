import path from 'path'
import express from 'express'
import React from 'react'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { createStore, combineReducers, applyMiddleware } from "redux";
import languageReducer from './src/reducer/language'
import myCookies from './src/reducer/cookies'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import { matchRoutes } from "react-router-config"
import { Routes } from './src/App/routes/routes'
import App from './src/App/App'

const bodyParser  = require("body-parser")
const compression = require('compression');
const cors = require('cors')
const MobileDetect = require('mobile-detect')
const request = require("request");
const cluster = require('cluster');
const https = require("https")
const http = require("http")
const helmet = require('helmet');
const tls = require('tls');
require('dotenv').config();

// Code to run if we're in the master process
if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
  
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for dying workers
    cluster.on('exit', function (worker) {
  
        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
  
    });
}
else {
    global.Headers = fetch.Headers
  if (typeof window === 'undefined') {
    global.window = {}
  }

  const PORT = process.env.PRODUCTION_PORT
  const app = express()

  // tell the app to use the above rules
  app.use(compression())
  app.use(helmet())
  app.use(express.static('./build'));
  app.use(express.static('./run'));
  app.use(cors())
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

    //Force https
    //   app.use (function (req, res, next) {
    //     if (req.secure) {
    //       next()
    //     }
    //     else {
    //       res.redirect(301, 'https://' + req.headers.host + req.url);
    //     }
    //   })

    app.get('/robots.txt', function (req, res) {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    })

    const renderPage = async (reducer, store, context, promises, location, req, res, next) => {
        const indexFile = path.resolve('./base/index.html');
        const html = ReactDOMServer.renderToString(<Provider store={store}><StaticRouter context={context} location={location}><App location={location}/></StaticRouter></Provider>)
        const serializedState = JSON.stringify(store.getState())
        fs.readFile(indexFile, 'utf8', (err, indexData) => {
            if (err) {
              console.error('Something went wrong:', err);
              return res.status(500).send('Oops, better luck next time!');
            }
            if (context.status === 404) {
              res.status(404);
            }
            if (context.url) {
              return res.redirect(301, context.url);
            }
      
            return res.send(
              indexData
              .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
              .replace(
                '</body>',
                `<script>window.__PRELOADED_STATE__ = ${serializedState}</script></body>`
              )
            )
          })
    }

    const serverRendererAsync = async (location, req, res, next) => {
        const host = req.get('host')
        var langue = host.substring(host.length - 4) === ".com" ? "en" : "fr"
    
        const context = {}
        const reducer = combineReducers({language : languageReducer, myCookies : myCookies})
        const store = createStore(reducer, applyMiddleware(thunk))
    
        const promises = await matchRoutes(Routes, req.path)
        await store.dispatch({type : "SET_LANGUAGE_SSR", langue})
        if (promises["0"].route.loadData) {
          await store.dispatch(promises["0"].route.loadData(promises["0"].match))
        }
    
        const isMobile = new MobileDetect(req.headers['user-agent']);
        isMobile.mobile() !== null ? await store.dispatch({type : "SET_MOBILE", value : true}) : await store.dispatch({type : "SET_MOBILE", value : false})    
    
        /*HomePage et autres*/
        /*======================================*/
        return renderPage(reducer, store, context, promises, location, req, res, next)
        /*======================================*/
      }
    app.get('/*', (req, res) => {
        //SSR
        serverRendererAsync(req.url, req, res)
    })

    const httpServer = http.createServer(app)

    httpServer.listen(PORT, () => {
      console.log(`SSR running on port ${PORT}`)
    })
}