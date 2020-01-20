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
        let response = await axios.get(process.env.REACT_APP_API_URL + "/freelance")
        return response.data
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

    getProfileFreelanceWithUrl = async (url) => {
        let response = await axios.get(process.env.REACT_APP_API_URL + /user/ + url)
        
        response = response.data
        let caption = typeof response.city === "undefined" ? response.type : response.type + " " + response.city
        let reduxResponse = {
            name : response.firstname,
            surname : response.lastname,
            caption: caption,
            avatar: response.img,
            email : response.email,
            location : response.city,
            skills: response.skills,
            missions: response.missions,
            bio: response.bio,
            type : response.type,
            company : response.company,
            siret : response.siret,
            phone : response.phone
        }
        return reduxResponse
    }

    getProfileFreelance = async () => {
        let response = await this.axios.post(process.env.REACT_APP_API_URL + "/me")

        response = response.data
        let caption = typeof response.city === "undefined" ? response.type : response.type + " " + response.city
        let reduxResponse = {
                name : response.firstname,
                surname : response.lastname,
                caption: caption,
                avatar: response.img,
                email : response.email,
                location : response.city,
                skills: response.skills,
                missions: response.missions,
                bio: response.bio,
                type : response.type,
                company : response.company,
                siret : response.siret,
                phone : response.phone,
                id : response._id
        }

        return reduxResponse
    }

    setPayed = async (data) => {
        let body = {
            payed : {
                status : true
            }
        }

        let response = await this.axios.post(process.env.REACT_APP_API_URL + "/edit", body)
        return response.data
    }

    uploadPP = async (data) => {
        console.log(data)
        let response = await this.axios.post(process.env.REACT_APP_API_URL + "/upload", data)
        response = response.data

        let body = {
            img : response.url
        }
        response = await this.axios.post(process.env.REACT_APP_API_URL + "/edit", body)
        return response
    }

    setProfileFreelance = async (state) => {
        console.log(state)
        let response = await this.axios.post(process.env.REACT_APP_API_URL + "/edit", state)

        response = response.data
        let caption = typeof response.city === "undefined" ? response.type : response.type + " " + response.city
        let reduxResponse = {
            name : response.firstname,
            surname : response.lastname,
            caption: caption,
            avatar: response.img,
            email : response.email,
            location : response.city,
            skills: response.skills,
            missions: response.missions,
            bio: response.bio,
            type : response.type
        }

        return reduxResponse
    }

    wait = async (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    resetPassword = async (password) => {
        let body = {
            password : password
        }

        let response = await this.axios.post(process.env.REACT_APP_API_URL + "/modifyPassword", body)
        return response
    }

    resetMDP = async (token, password) => {
        let body = {
            password : password,
            resetPasswordToken : token
        }

        console.log(body)
        let response = await axios.post(process.env.REACT_APP_API_URL + "/reset", body)
        console.log(response)
        return response
    }

    forgotMDP = async (email) => {
        let body = {
            email : email
        }

        console.log(body)

        let response = await axios.post(process.env.REACT_APP_API_URL + "/forgot", body)
        console.log(response)
        return response
    }

    sendNewMission = async(body) => {
        console.log(body)
        let response = await this.axios.post(process.env.REACT_APP_API_URL + "/createmission", body)
        console.log(response)
        return response
    }

    login = async (email, password) => {
        let body = {
            email : email,
            password : password
        }
        
        let response = await axios.post(process.env.REACT_APP_API_URL + "/login", body)

        let token = response.data.token

        response = response.data.user
        let caption = typeof response.city === "undefined" ? response.type : response.type + " " + response.city
        let reduxFormatResponse = {
            role : response.type,
            token : token, 
            user : {
                name : response.firstname,
                surname : response.lastname,
                caption: caption,
                avatar: response.img,
                email : response.email,
                location : response.city,
                skills: response.skills,
                missions: response.missions,
                bio: response.bio,
                type : response.type,
                id : response._id
            },
            paid : response.type === "freelance" ? "true" : response.payed.status
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
            img : "https://img.icons8.com/plasticine/2x/user.png",
            type : "freelance"
        }

        let response =  await axios.post(process.env.REACT_APP_API_URL + "/register", newBody)

        return {
            role : 'freelance',
            token : response.data.token,
            user : response.data.user
        }
    }

    registerProprietaire = async (body) => {
        let newBody = {
            email : body.email,
            password : body.password,
            firstname : body.name,
            lastname : body.lastname,
            img : "https://img.icons8.com/plasticine/2x/user.png",
            type : "proprietaire"
        }

        console.log(newBody)

        let response =  await axios.post(process.env.REACT_APP_API_URL + "/register", newBody)

        return {
            role : 'proprietaire',
            token : response.data.token,
            user : response.data.user,
            paid : response.data.user.payed.status
        }
    }

    logout = async () => {
        return await this.axios.post(process.env.REACT_APP_API_URL + "/logout")
    }

    getMissions = async (city) => {
        let profile = JSON.parse(localStorage.getItem('profile'))
        let newBody = {
            
        }
        console.log(profile)
        console.log(newBody)
        let response =  await this.axios.post(process.env.REACT_APP_API_URL + "/getmission", newBody)

        console.log(response)
        return response.data

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
