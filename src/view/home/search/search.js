import React from 'react'
import './search.css'
import AlgoliaPlaces from 'algolia-places-react';
import { MDBContainer, MDBRow, MDBBtn, MDBCol } from 'mdbreact'

class SearchHome extends React.Component {
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
                            countries: ['fr'],
                            type: 'city',
                            }}
                
                            onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
                            console.log('Fired when suggestion selected in the dropdown or hint was validated.')}
                    
                            onSuggestions={({ rawAnswer, query, suggestions }) => 
                            console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}
                    
                            onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
                            console.log('Fired when arrows keys are used to navigate suggestions.')}
                    
                            onClear={() => 
                            console.log('Fired when the input is cleared.')}
                    
                            onLimit={({ message }) => 
                            console.log('Fired when you reached your current rate limit.')}
                    
                            onError={({ message }) => 
                            console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                        />
                    </MDBCol>
                    <MDBCol xl="3">
                        <MDBBtn className="w-100 buttonSearch" color="pink">Rechercher</MDBBtn>
                    </MDBCol>                    
                </MDBRow>
            </MDBContainer>
        </div>
        )
    }
}

export default SearchHome