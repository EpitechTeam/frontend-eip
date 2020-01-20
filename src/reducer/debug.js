import history from "../App/routes/history";
import API from "../API/api";

const initialState = {
    debug : true,
    erreurDebugMessage : ""
}

export function sendNewMission(token, body) {
    return dispatch => {
        let newData = new API(token)
        return newData.sendNewMission(body)
        .then (
            response => Promise.all([
                dispatch({ type : "SEE_MISSIONS"}),
            ]),
            erreur => dispatch({ type : "ERREUR_REGISTER", erreur})
        )
    }
}

const debugReducer = ( state = initialState,  action) => {
    switch (action.type) {
        case "SEE_MISSIONS" :
        state = {
            debug : true
        };
        history.push('/missions')
        window.location.reload()
        break;

        case "SET_ERREUR_DEBUG" :
            state = {
                ...state,
                erreurDebugMessage : action.erreur.response.data.errmsg
            }
        break;

    default :
    }
    return state
}

export default debugReducer