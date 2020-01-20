import path from 'path'
import express from 'express'
import React from 'react'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { createStore, combineReducers, applyMiddleware } from "redux";
import languageReducer from './src/reducer/language'
import myCookies from './src/reducer/cookies'
import authenticate from './src/reducer/authenticate'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import { matchRoutes } from "react-router-config"
import { Routes } from './src/App/routes/routes'
import App from './src/App/App'
import fetch from 'node-fetch'
import DocumentMeta, {render} from 'react-document-meta';
import { renderToStaticMarkup } from 'react-dom/server';
import missionReducer from "./src/reducer/missions";
import freelanceReducer from "./src/reducer/freelanceProfile";
import homeReducer from './src/reducer/home'
import debugReducer from './src/reducer/debug'

const bodyParser  = require("body-parser")
const compression = require('compression');
const cors = require('cors')
const MobileDetect = require('mobile-detect')
const cluster = require('cluster');
const http = require("http")
const helmet = require('helmet');
require('dotenv').config();

//Code sur le processus mere
if (cluster.isMaster) {
    //Nombre de cpu (cluster)
    var cpuCount = require('os').cpus().length;
  
    //Crée autant de cluster que de cpu
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen si un cluster meurt
    cluster.on('exit', function (worker) {
  
        //Si un cluster meurt on le recrée
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
  
    });
}
//Code processus fille (cluster)
else {

    //En SSR Window n'existe pas alors on créer un objet vide pour ne pas avoir de undefined
    global.Headers = fetch.Headers
    if (typeof window === 'undefined') {
      global.window = {}
    }

    const PORT = process.env.PRODUCTION_PORT
    const app = express()

    // tell the app to use the above rules

    //Compresser les fichiers static pour de meilleurs performance
    app.use(compression())

    //Utiliser helmet pour ce protéger de certaines failles
    app.use(helmet())

    //Servir les fichier static build avec npm build
    app.use(express.static('./run'));

    //Autoriser cors pour les requetes
    app.use(cors())

    //Etablir la limite d'une requetes POST
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

    //Bloquer les robots pour ne pas ce faire indexer tout de suite
    app.get('/robots.txt', function (req, res) {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    })

    function rewindAsStaticMarkup() {
      const tags = render(DocumentMeta.rewind());
  
      return renderToStaticMarkup(<div>{tags}</div>)
      .replace(/(^<div>|<\/div>$)/g, '')
      .replace(/data-rdm="true"/g, 'data-rdm');
    }


    //Methode principale pour render en SSR
    const renderPage = async (reducer, store, context, promises, location, req, res, next) => {
        const indexFile = path.resolve('./base/index.html');
        console.log(store.getState())
        //Render avec la methode SSR proposé par React
        const html = ReactDOMServer.renderToString(<Provider store={store}><StaticRouter context={context} location={location}><App location={location}/></StaticRouter></Provider>)
        
        //Mettre le state redux en string
        const serializedState = JSON.stringify(store.getState())
        console.log("laa")
        console.log(serializedState)

        //Get la meta
        const meta = rewindAsStaticMarkup()

        //Lire le fichier index.html et remplacé les infos généré par renderToString
        fs.readFile(indexFile, 'utf8', (err, indexData) => {
            //Trouve pas le fichier
            if (err) {
              console.error('Something went wrong:', err);
              return res.status(500).send('Oops, better luck next time!');
            }

            //Envoi le fichier html modifié au client
            return res.send(
              indexData
              .replace('<title>React App</title>', `${meta}`)
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

        //Si on est sur .com mettre en anglais et sur .fr load en francais
        var langue = host.substring(host.length - 4) === ".com" ? "en" : "fr"
    
        const context = {}

        //Créer le store redux
        const reducer = combineReducers({
          language : languageReducer,
          myCookies : myCookies,
          authenticate : authenticate,
          missions: missionReducer,
          freelanceProfile: freelanceReducer,
          home : homeReducer,
          debug : debugReducer
        })

        const store = createStore(reducer, applyMiddleware(thunk))
    
        //Trouver quel route a display
        const promises = await matchRoutes(Routes, req.path)

        //SET la langue dans le store redux
        await store.dispatch({type : "SET_LANGUAGE_SSR", langue})

        //Fetch la data grace a la methode loadData
        if (promises["0"].route.loadData) {
          await store.dispatch(promises["0"].route.loadData(promises["0"].match))
        }
    
        //SET si c'est un mobile pour render la bonne version
        const isMobile = new MobileDetect(req.headers['user-agent']);
        isMobile.mobile() !== null ? await store.dispatch({type : "SET_MOBILE", value : true}) : await store.dispatch({type : "SET_MOBILE", value : false})    
    
        /*HomePage et autres*/
        /*======================================*/
        return renderPage(reducer, store, context, promises, location, req, res, next)
        /*======================================*/
    }

    //Toutes les autres routes
    app.get('/*', (req, res) => {
        //SSR
        serverRendererAsync(req.url, req, res)
    })

    //Crée le serveur ecoutant sur le port defini dans le .env
    const httpServer = http.createServer(app)
    httpServer.listen(PORT, () => {
      console.log(`SSR running on port ${PORT}`)
    })
}
