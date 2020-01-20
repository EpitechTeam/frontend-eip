import API from '../API/api'

const initialState = {
    seo : {},
    data : []
}

export function getSEOHome() {
    return dispatch => {
      let newData = new API();
      return newData.fetchSEOHome()
      .then (
        response => dispatch({ type : "SET_SEO", response}),
        erreur => console.log("erreur seo")
      )
    }
}

export function getHomeData() {
    return dispatch => {
      let newData = new API();
      return newData.fetchHomeData()
      .then (
        response => dispatch({ type : "SET_HOME", response}),
        erreur => console.log("erreur seo")
      )
    }
}

export function loadHomeData() {
    return function (dispatch) {
      return (
        Promise.all([
            dispatch(getHomeData()),
            dispatch(getSEOHome()),
        ])
      )
    }
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_SEO" :
      state = {
        ...state,
        seo : action.response
      }
      break;

      case "SET_HOME" :
      state = {
        ...state,
        data : action.response
      }
      break;
  
      default:
    }
    return state
}
  
export default homeReducer
