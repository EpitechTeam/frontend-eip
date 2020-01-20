import API from "../API/api";

const initialState = {
    missions: []
};

export function getMissions(token) {
    return dispatch => {
        let newData = new API(token);
        return newData.getMissions()
            .then(
                response => dispatch({type: "GET_MISSIONS", response}),
                error => console.log("Erreur getMissions")
            )
    }
}

export function loadMissionsData() {
    return function (dispatch) {
        return (
            Promise.all([
                dispatch(getMissions()),
            ])
        )
    }
}


const missionReducer = (state = initialState, action) => {
    if (action.type === 'GET_MISSIONS') {
        state = {
            ...state,
            missions: action.response
        };
    }
    return state;
};

export default missionReducer;
