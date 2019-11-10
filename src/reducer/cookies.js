const initialState = {
    myCookies : typeof localStorage !== "undefined" ? localStorage.getItem('isCookies') : "false"
}

const cookiesReducer = ( state = initialState,  action) => {
    switch (action.type) {
        case "SET_COOKIES" :
        state = {
            ...state,
            myCookies : action.payload
        };
        localStorage.setItem('iscookies', action.payload)
        break;

    default :
    }
    return state
}

export default cookiesReducer