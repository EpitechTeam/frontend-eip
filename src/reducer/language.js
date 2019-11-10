let initialState

if (typeof window !== 'undefined' && document.domain) {
  initialState = {
    langue : document.domain.slice(-3).replace('/', '').replace('.', '').replace('com', 'en') === "fr" ? "fr"
    : document.domain.slice(-3).replace('/', '').replace('.', '').replace('com', 'en') === "en" ? "en"
    : localStorage.getItem("language") ? localStorage.getItem("language")
    : "fr"
  }
  document.documentElement.lang = initialState.langue
}
else if (typeof localStorage !== "undefined") {
  initialState = {
    langue : localStorage.getItem("language") ? localStorage.getItem("language") : "fr"
  }
}
else {
  initialState = {
    langue : "fr",
    mobile : false
  }
}

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE_SSR" :
      state = {
        ...state,
        langue : action.langue
      }
    break;

    case "SET_MOBILE" :
      state = {
        ...state,
        mobile : action.value
      }
    break;

    case "SET_LANGUAGE" :
      state = {
        ...state,
        langue : action.payload
      };
      localStorage.setItem("language", action.payload)
      document.documentElement.lang = action.payload
      break;
    default :
  }
  return state
}

export default languageReducer