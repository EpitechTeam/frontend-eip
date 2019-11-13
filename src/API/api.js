class API {
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
        await this.wait(1000)
        return {role: 'freelance', token: '123'}
    }

    getMissions = async () => {
        return [
            {
                name: "Mission 1",
                objet: "Texte descriptif de la mission",
                houseOwner: "M. Dupont",
                status: "En cours",
                date: "12/11/2019"
            },
            {
                name: "Mission 2",
                objet: "Texte descriptif de la mission 2",
                houseOwner: "Mme. Eloat",
                status: "Terminé",
                date: "08/11/2019"
            },
            {
                name: "Mission 3",
                objet: "Texte descriptif de la mission 3",
                houseOwner: "M. Rochet",
                status: "En attente",
                date: "11/11/2019"
            },
        ];
    };
}

export default API
