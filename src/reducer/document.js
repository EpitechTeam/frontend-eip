import API from "../API/api";


const initialDocuments = {
    id_card: {
        file: '',
        name: '',
        timestamp: '',
        status: '',
    },
    sirene: {
        file: '',
        name: '',
        timestamp: '',
        status: '',
    }
};

const initialState = {
    documents: typeof localStorage !== "undefined" ? localStorage.getItem('documents') !== null ? JSON.parse(localStorage.getItem('documents')) : initialDocuments : initialDocuments
};

export function getDocument(token, type) {
    return dispatch => {
        let api = new API(token);
        return api.getDocument({type: type})
            .then (
                payload => {
                    console.log('PAYLOAD API GET DOCUMENT', payload);
                    payload.type = type;
                    Promise.all([dispatch({ type : "UPDATE_DOCUMENT", payload: payload})])
                },
                erreur => console.log(erreur)
            )
    }
}

export function uploadDocument(token, data, type) {
    console.log("API UPLOAD:", token, data, type);
    return dispatch => {
        let api = new API(token);
        const formData = new FormData();
        formData.append('file', data);
        formData.append('type', type);
        return api.uploadDocument(formData)
            .then (
                payload => {
                    payload.type = type;
                    Promise.all([
                        dispatch({ type : "UPDATE_DOCUMENT", payload: payload})
                ])},
                erreur => console.log(erreur)
            )
    }
}

export function deleteDocument(token, type) {
    console.log(type);
    return dispatch => {
        let api = new API(token);
        return api.deleteDocument({type: type})
            .then (
                payload => {
                    payload.type = type;
                    Promise.all([
                        dispatch({ type : "UPDATE_DOCUMENT", payload})
                ])},
                erreur => console.log(erreur)
            )
    }
}

const documentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DOCUMENT': {
            if (!(action.payload.type === 'id_card' || action.payload.type === 'sirene'))
                break;
            let documents = {...state.documents};
            documents[action.payload.type] = {
                file: action.payload.data[action.payload.type].file,
                name: action.payload.data[action.payload.type].name,
                timestamp: action.payload.data[action.payload.type].timestamp,
                status: action.payload.data[action.payload.type].status,
            };
            if (typeof localStorage !== "undefined") {
                localStorage.setItem('documents', JSON.stringify(documents))
            }
            state = {...state, documents: documents};
            console.log('STATE:', state);
            break;
        }
        default: return state;
    }
    return state;
};

export default documentReducer;
