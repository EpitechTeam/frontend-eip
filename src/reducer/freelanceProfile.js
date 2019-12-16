const initialState = {
    profile: {
        name: 'Monty',
        surname: 'Criel',
        caption: 'Freelance Montpellier',
        avatar: 'https://assurewealth.com.au/wp-content/uploads/2016/08/bwlionroar-350x350.jpg',
        email: 'monty.criel@gmail.com',
        password: 'i<3b0oB1Z',
        location: 'Montpellier, France',
        stats: {
            price: '250€ / jour',
            responseTime: '4h',
            responseRate: '100%',
            experience: '2-7 ans',
            recommandations: 3,
        },
        skills: ['Accueil', 'Animation', "Piscine", 'Courses', 'Jardinage'],
        missions: [
            {label: 'Déplacement', description: 'Déplacement sur lieux de propriétés dans toute la France métropole'},
            {label: 'Compétences', description: 'Recherche des missions en gîtes'},
            {label: 'Durée de mission', description: 'Recherche des missions ~3-6 mois'}
        ],
        bio: "Expérience dans l'hôtellrie ainsi que la gestion de multiple propriétés, c'est ma passion !"
    }
};

class freelanceAPI {
    fetchProfile = async () => {
        return {...initialState}
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

const freelanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROFILE': {
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
        default: return state;
    }
    return state;
};

export default freelanceReducer;
