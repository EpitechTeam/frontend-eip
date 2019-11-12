import API from "../API/api"

const initialState = {
    authenticate : typeof localStorage !== "undefined" ? localStorage.getItem('authenticate') === null ? "false" :  localStorage.getItem('authenticate') : "false",
    role : typeof localStorage !== "undefined" ? localStorage.getItem('role') === null ? "" : localStorage.getItem('role') : "",
    token : typeof localStorage !== "undefined" ? localStorage.getItem('token') === null ? "" : localStorage.getItem('token') : ""
}

export function login(email, password) {
    return dispatch => {
        let newData = new API()
        return newData.login(email, password)
        .then (
            response => Promise.all([
                dispatch({ type : "SET_ROLE", response}),
                dispatch({ type : "SET_TOKEN", response}),
                dispatch({ type : "SET_AUTHENTICATE", authenticate : "true"})
            ]),
            erreur => console.log("erreur login")
        )
    }
}

export function logout() {
    return dispatch => {
        dispatch({ type : "SET_LOGOUT"})
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

        case "SET_LOGOUT" :
            localStorage.setItem('role', "")
            localStorage.setItem('token', "")
            localStorage.setItem('authenticate', false)
            state = {
                authenticate : "false",
                role : "",
                token : ""
            }
        break;

    default :
    }
    return state
}

export default authenticateReducer