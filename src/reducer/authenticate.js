import API from "../API/api"

const initialState = {
    authenticate : false,
    role : ''
}

export function login(email, password) {
    return dispatch => {
        let newData = new API()
        return newData.login(email, password)
        .then (
            response => Promise.all([
                dispatch({ type : "SET_ROLE", response}),
                dispatch({ type : "SET_TOKEN", response}),
                dispatch({ type : "SET_AUTHENTICATE", authenticate : true})
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
        break;

        case "SET_ROLE" :
            state = {
                ...state,
                role : action.response.role
            }
        break;

        case "SET_TOKEN" :
            state = {
                ...state,
                token : action.response.token
            }
        break;

        case "SET_LOGOUT" :
            state = initialState
        break;

    default :
    }
    return state
}

export default authenticateReducer