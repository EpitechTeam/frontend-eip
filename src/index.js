import React from 'react';
import App from './App/App';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
import history from './App/routes/history'
import { hydrate } from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import languageReducer from './reducer/language'
import myCookies from './reducer/cookies'

const rootElement = document.getElementById('root') || document.createElement('div')

delete window.__PRELOADED_STATE__

const reducer = combineReducers({language : languageReducer, myCookies : myCookies})

const store = createStore(reducer, window.__PRELOADED_STATE__, applyMiddleware(thunk))

if (typeof document === "undefined") {
    hydrate(<Provider store={store}><BrowserRouter><App {...window.__INITIAL_APP_STATE__}/></BrowserRouter></Provider>, rootElement)
}
else {
    hydrate(<Provider store={store}><BrowserRouter history={history} ><App {...window.__INITIAL_APP_STATE__}/></BrowserRouter></Provider>, rootElement)
}