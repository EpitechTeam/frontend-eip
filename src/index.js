import React from 'react';
import App from './App/App';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import history from './App/routes/history'
import {hydrate} from 'react-dom';
import store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import languageReducer from './reducer/language'
import myCookies from './reducer/cookies'
import authenticate from './reducer/authenticate'
import missionReducer from './reducer/missions'
import freelanceReducer from './reducer/freelanceProfile'
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

const rootElement = document.getElementById('root') || document.createElement('div')

if (typeof document === "undefined") {
    delete window.__PRELOADED_STATE__

    const reducer = combineReducers({
        language: languageReducer,
        myCookies: myCookies,
        authenticate: authenticate,
        missions: missionReducer,
        freelanceProfile: freelanceReducer
    })

    var SSR_store = createStore(reducer, window.__PRELOADED_STATE__, applyMiddleware(thunk))
    hydrate(<Provider
        store={SSR_store}><BrowserRouter><App {...window.__INITIAL_APP_STATE__}/></BrowserRouter></Provider>, rootElement)
}
else {
    hydrate(<Provider store={store}><BrowserRouter
        history={history}><App {...window.__INITIAL_APP_STATE__}/></BrowserRouter></Provider>, rootElement)
}
