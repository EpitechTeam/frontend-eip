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
}

export default API