import languageReducer from './reducer/language'
import myCookies from './reducer/cookies'
import authenticate from './reducer/authenticate'
import missionReducer from './reducer/missions'
import profileReducer from './reducer/profile';
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import homeReducer from './reducer/home';
import debugReducer from './reducer/debug';
import documentReducer from './reducer/document';

var store

const reducer = combineReducers({
    language: languageReducer,
    home: homeReducer,
    myCookies: myCookies,
    authenticate: authenticate,
    missions: missionReducer,
    profile: profileReducer,
    debug : debugReducer,
    document : documentReducer
})

store = createStore(reducer, applyMiddleware(thunk))

export default store






