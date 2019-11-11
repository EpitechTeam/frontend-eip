import React from 'react'
import './search.css'
import AlgoliaPlaces from 'algolia-places-react';
import { MDBContainer, MDBRow, MDBBtn, MDBCol } from 'mdbreact'

class SearchHome extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            ville : ""
        }
    }

    render() {
        return (
        <div>
            <h1 className="TitleHome">Trouvez un partenaire de confiance<br/>pour gérer votre annonce Airbnb</h1>
            <MDBContainer style={{paddingTop : "20px"}}>
                <MDBRow>
                    <MDBCol xl="9">
                        <AlgoliaPlaces
                            placeholder='Pays, Région, Ville...'
                    
                            options={{
                            appId: 'plIOZH1K5KVK',
                            apiKey: 'd3dabd9d74c1378eec2667aac653e04a',
                            language: 'fr',
                            countries: ['fr', 'de'],
                            type: 'city',
                            }}
                            
                            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
                            this.setState({ville : suggestion.name})}
                    
                            onLimit={({ message }) => 
                            console.log('Fired when you reached your current rate limit.')}
                    
                            onError={({ message }) => 
                            console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                        />
                    </MDBCol>
                    <MDBCol xl="3">
                        <MDBBtn href={this.state.ville !== "" ? "recherche/" + this.state.ville : "recherche"} className="w-100 buttonSearch" color="pink">Rechercher</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
        )
    }
}

export default SearchHome