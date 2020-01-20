import languageReducer from './reducer/language'
import myCookies from './reducer/cookies'
import authenticate from './reducer/authenticate'
import missionReducer from './reducer/missions'
import freelanceReducer from './reducer/freelanceProfile';
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import homeReducer from './reducer/home';
import debugReducer from './reducer/debug';

var store

const reducer = combineReducers({
    language: languageReducer,
    home: homeReducer,
    myCookies: myCookies,
    authenticate: authenticate,
    missions: missionReducer,
    freelanceProfile: freelanceReducer,
    debug : debugReducer
})

store = createStore(reducer, applyMiddleware(thunk))

export default store






