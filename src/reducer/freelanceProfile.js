import API from "../API/api"

const initialProfile = {
    name: '',
    surname: '',
    caption: '',
    avatar: '',
    email: '',
    password: '',
    location: '',
    skills: [''],
    missions: [
        {label: 'Déplacement', description: 'Déplacement sur lieux de propriétés dans toute la France métropole'},
        {label: 'Compétences', description: 'Recherche des missions en gîtes'},
        {label: 'Durée de mission', description: 'Recherche des missions ~3-6 mois'}
    ],
    bio: "",
    id : "",
    emailVerified : true
}

const initialState = {
    profile: typeof localStorage !== "undefined" ? localStorage.getItem('profile') !== null ? JSON.parse(localStorage.getItem('profile')) : initialProfile : initialProfile 
}

export function getProfileUrl(url) {
    return dispatch => {
        let newData = new API()
        return newData.getProfileFreelanceWithUrl(url)
        .then (
            payload => Promise.all([
                dispatch({ type : "SET_PROFILE", payload}),
            ]),
            erreur => console.log(erreur)
        )
    }
}

export function validEmail(id) {
    return dispatch => {
        let newData = new API()
        return newData.validEmail(id)
        .then (
            payload => Promise.all([
                dispatch({ type : "REDIRECT_HOME"})
            ]),
            erreur => console.log(erreur)
        )
    }
}

export function uploadPP(token, data) {
    console.log(data)
    return dispatch => {
        let newData = new API(token)
        return newData.uploadPP(data)
        .then (
            payload => Promise.all([
                
            ]),
            erreur => console.log(erreur)
        )
    }
}

export function setPayed(token) {
    return dispatch => {
        let newData = new API(token)
        return newData.setPayed()
        .then (
            payload => Promise.all([
                dispatch({ type : "SEE_MISSIONS"}),
                dispatch({ type : "TURN_ON_PAYED" })
            ]),
            erreur => console.log(erreur)
        )
    } 
}

export function setProfile(token, state) {
    return dispatch => {
        let newData = new API(token)
        return newData.setProfileFreelance(state)
        .then (
            payload => Promise.all([
                dispatch({ type : "SET_PROFILE", payload}),
            ]),
            erreur => console.log(erreur)
        )
    }
}

export function getProfile(token) {
    return dispatch => {
        let newData = new API(token)
        return newData.getProfileFreelance()
        .then (
            payload => Promise.all([
                dispatch({ type : "SET_PROFILE", payload}),
            ]),
            erreur => console.log(erreur)
        )
    }
}

// Redux thunk
export function updateBio(bio) {
    return dispatch => {
        // API GET
        // let api = new freelanceAPI();
        // return api.fetchProfile()
        //     .then (
        //         response => dispatch({type: "UPDATE_BIO", response}),
        //         error => console.log("error freelance profile")
        //     )
        dispatch({type: "UPDATE_BIO", payload: bio})
    }
}

// Redux thunk
export function updateSkills(skills) {
    return dispatch => {
        // API GET
        // let api = new freelanceAPI();
        // return api.fetchProfile()
        //     .then (
        //         response => dispatch({type: "UPDATE_BIO", response}),
        //         error => console.log("error freelance profile")
        //     )
        dispatch({type: "UPDATE_SKILLS", payload: skills})
    }
}

// Redux thunk
export function updateStats(stats) {
    return dispatch => {
        // API GET
        // let api = new freelanceAPI();
        // return api.fetchProfile()
        //     .then (
        //         response => dispatch({type: "UPDATE_BIO", response}),
        //         error => console.log("error freelance profile")
        //     )
        dispatch({type: "UPDATE_STATS", payload: stats})
    }
}

const freelanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE': {
            console.log(action.payload)
            localStorage.setItem('profile', JSON.stringify(action.payload))
            state = {...state, profile: action.payload};
            break;
        }
        case 'UPDATE_BIO': {
            state = {...state, profile: {...state.profile, bio: action.payload}};
            break;
        }
        case 'UPDATE_SKILLS': {
            state = {...state, profile: {...state.profile, skills: action.payload}};
            break;
        }
        case 'UPDATE_STATS': {
            state = {...state, profile: {...state.profile, stats: action.payload}};
            break;
        }
        default: return state;
    }
    return state;
};

export default freelanceReducer;
