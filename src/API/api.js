class API {
    fetchHomeData = async () => {
        return "Hello Home"
    }

    fetchSEOHome = async () => {
        return (
            {
                title : "Conciergerie en ligne",
                meta : "Trouvez un partenaire pour votre offre airbnb",
                text : "Venez trouvez un partenaire pour votre offre Airbnb"
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
        return { role : 'freelance', token : '123' }
    }
}

export default API