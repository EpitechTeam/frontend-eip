import API from "../API/api"
import history from '../App/routes/history'

const initialState = {
    authenticate : typeof localStorage !== "undefined" ? localStorage.getItem('authenticate') === null ? "false" :  localStorage.getItem('authenticate') : "false",
    role : typeof localStorage !== "undefined" ? localStorage.getItem('role') === null ? "" : localStorage.getItem('role') : "",
    token : typeof localStorage !== "undefined" ? localStorage.getItem('token') === null ? "" : localStorage.getItem('token') : "",
    paid : typeof localStorage !== "undefined" ? localStorage.getItem('paid') === null ? "" : localStorage.getItem('paid') : "",
    erreurLoginMessage : "",
    erreurRegisterMessage : ""
}

export function forgotMDP(email) {
    return dispatch => {
        let newData = new API()
        return newData.forgotMDP(email)
        .then (
            response => Promise.all([
                
            ]),
            erreur => dispatch({ type : "ERREUR_LOGIN", erreur})
        )
    }
}

export function resetMDP(token, password) {
    return dispatch => {
        console.log(token)
        let newData = new API()
        return newData.resetMDP(token, password)
        .then (
            response => Promise.all([
                dispatch({ type : "REDIRECT_HOME"})
            ]),
            erreur => dispatch({ type : "ERREUR_LOGIN", erreur})
        )
    }
}

export function resetPassword(token, password) {
    return dispatch => {
        console.log(token)
        let newData = new API(token)
        return newData.resetPassword(password)
        .then (
            response => Promise.all([
                dispatch({ type : "REDIRECT_HOME"})
            ]),
            erreur => dispatch({ type : "ERREUR_LOGIN", erreur})
        )
    }
}

export function login(email, password) {
    return dispatch => {
        let newData = new API()
        return newData.login(email, password)
        .then (
            response => Promise.all([
                dispatch({ type : "SET_ROLE", response}),
                dispatch({ type : "SET_TOKEN", response}),
                dispatch({ type : "SET_AUTHENTICATE", authenticate : "true"}),
                dispatch({ type : "SET_PROFILE", payload : response.user }),
                dispatch({ type : "SET_PAID", payload : response.paid }),
            ]),
            erreur => dispatch({ type : "ERREUR_LOGIN", erreur})
        )
    }
}

export function registerProprietaire(body) {
    return dispatch => {
        let newData = new API()
        return newData.registerProprietaire(body)
        .then (
            response => Promise.all([
                dispatch({ type : "SET_ROLE", response}),
                dispatch({ type : "SET_TOKEN", response}),
                dispatch({ type : "SET_AUTHENTICATE", authenticate : "true"}),
                dispatch({ type : "SET_PROFILE", payload: response.user}),
                dispatch({ type : "SET_PAID", payload : response.paid }),
                //dispatch({ type : "REDIRECT_PLAN"})
            ]),
            erreur => dispatch({ type : "ERREUR_REGISTER", erreur})
        )
    }
}

export function registerFreelance(body) {
    return dispatch => {
        let newData = new API()
        return newData.registerFreelance(body)
        .then (
            response => Promise.all([
                dispatch({ type : "SET_ROLE", response}),
                dispatch({ type : "SET_TOKEN", response}),
                dispatch({ type : "SET_AUTHENTICATE", authenticate : "true"}),
                dispatch({ type : "SET_PROFILE", payload: response.user}),
                dispatch({ type : "REDIRECT_PROFILE"})
            ]),
            erreur => dispatch({ type : "ERREUR_REGISTER", erreur})
        )
    }
}

export function logout() {
    return (dispatch, getState) => {
        console.log(getState())
        let newData = new API(getState().authenticate.token)
        return newData.logout()
        .then (
            response => Promise.all([
                dispatch({type : "SET_LOGOUT"})
            ]),
            erreur => Promise.all([
                dispatch({type : "SET_LOGOUT"})
            ])
        )
    }
}

const authenticateReducer = ( state = initialState,  action) => {
    switch (action.type) {
        case "SET_AUTHENTICATE" :
            state = {
                ...state,
                authenticate : action.authenticate
            }
            localStorage.setItem('authenticate', action.authenticate)
        break;

        case "TURN_ON_PAYED" :
            state = {
                paid : "true"
            }
            localStorage.setItem('paid', "true")
        break;

        case "SET_ROLE" :
            state = {
                ...state,
                role : action.response.role
            }
            localStorage.setItem('role', action.response.role)
        break;

        case "SET_TOKEN" :
            state = {
                ...state,
                token : action.response.token
            }
            localStorage.setItem('token', action.response.token)
        break;

        case "SET_PAID" : 
            state = {
                ...state,
                paid : action.payload === false ? "false" : "true"
            }
            localStorage.setItem('paid', action.payload)
        break;

        case "SET_LOGOUT" :
            localStorage.setItem('role', "")
            localStorage.setItem('token', "")
            localStorage.removeItem('profile');
            localStorage.setItem('authenticate', false)
            history.push('/')
            window.location.reload()
            state = {
                authenticate : "false",
                role : "",
                token : ""
            }
        break;

        case "REDIRECT_PROFILE" :
                history.push('/profile')
                window.location.reload()
        break;

        case "REDIRECT_HOME" :
            history.push('/')
            window.location.reload()
        break;

        case "REDIRECT_PLAN" :
                history.push('/create-profile-proprietaire/plan')
                window.location.reload()
        break;

        case "ERREUR_LOGIN" :
            state = {
                ...state,
                erreurLoginMessage : action.erreur.response.data.error
            }
        break;

        case "ERREUR_REGISTER" :
            console.log(action.erreur)
            state = {
                ...state,
                erreurRegisterMessage : action.erreur.response.data.errmsg
            }
        break;

    default :
    }
    return state
}

export default authenticateReducer