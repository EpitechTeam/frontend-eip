import languageReducer from './reducer/language'
import myCookies from './reducer/cookies'
import authenticate from './reducer/authenticate'
import missionReducer from './reducer/missions'
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

var store

const reducer = combineReducers({
    language: languageReducer,
    myCookies: myCookies,
    authenticate: authenticate,
    missions: missionReducer
})

store = createStore(reducer, applyMiddleware(thunk))

export default store






