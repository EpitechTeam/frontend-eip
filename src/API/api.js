import axios from "axios"
import defaults from "lodash/defaults"

class API {
    constructor(token) {
        this.token = token
   
        let credentials = {}
        const config = defaults(credentials, {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        })
        this.axios = axios.create(config)
    }

    fetchHomeData = async () => {
        return "Hello Home"
    }

    fetchSEOHome = async () => {
        return (
            {
                title: "Conciergerie en ligne",
                meta: "Trouvez un partenaire pour votre offre airbnb",
                text: "Venez trouvez un partenaire pour votre offre Airbnb"
            }
        )
    }

    wait = async (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    login = async (email, password) => {
        let body = {
            email : email,
            password : password
        }
        
        let response = await axios.post(process.env.REACT_APP_API_URL + "/login", body)

        let reduxFormatResponse = {
            role : 'freelance',
            token : response.data.token,
            user : response.data.user
        }
        return reduxFormatResponse
    }

    registerFreelance = async (body) => {
        let newBody = {
            email : body.email,
            password : body.password,
            firstname : body.firstname,
            lastname : body.name,
            city : body.ville,
            img : "https://img.icons8.com/plasticine/2x/user.png"
        }

        let response =  await axios.post(process.env.REACT_APP_API_URL + "/register", newBody)

        return {
            role : 'freelance',
            token : response.data.token,
            user : response.data.user
        }
    }

    logout = async () => {
        return await this.axios.post(process.env.REACT_APP_API_URL + "/logout")
    }

    getMissions = async () => {
        return [
            {
                name: "Mission 1",
                object: "Texte descriptif de la mission",
                houseOwner: "M. Dupont",
                status: "CURRENT",
                statusNb: 1,
                date: "12/11/2019"
            },
            {
                name: "Mission 2",
                object: "Texte descriptif de la mission 2",
                houseOwner: "Mme. Eloat",
                status: "DONE",
                statusNb: 2,
                date: "08/11/2019"
            },
            {
                name: "Mission 3",
                object: "Texte descriptif de la mission 3",
                houseOwner: "M. Rochet",
                status: "WAITING",
                statusNb: 0,
                date: "11/11/2019"
            },
            {
                name: "Mission 4",
                object: "Texte descriptif de la mission 4",
                houseOwner: "Mme. Frediche",
                status: "CANCELED",
                statusNb: -1,
                date: "14/11/2019"
            },
            {
                name: "Mission 5 copie",
                object: "Texte descriptif de la mission 4",
                houseOwner: "Mme. Frediche",
                status: "CANCELED",
                statusNb: -1,
                date: "14/11/2019"
            },
            {
                name: "Mission 5 copie",
                object: "Texte descriptif de la mission 4",
                houseOwner: "Mme. Frediche",
                status: "CANCELED",
                statusNb: -1,
                date: "14/11/2019"
            },
            {
                name: "Mission 5 copie",
                object: "Texte descriptif de la mission 4",
                houseOwner: "Mme. Frediche",
                status: "CANCELED",
                statusNb: -1,
                date: "14/11/2019"
            },
            {
                name: "Mission 5 copie",
                object: "Texte descriptif de la mission 4",
                houseOwner: "Mme. Frediche",
                status: "CANCELED",
                statusNb: -1,
                date: "14/11/2019"
            },
        ];
    };
}

export default API
