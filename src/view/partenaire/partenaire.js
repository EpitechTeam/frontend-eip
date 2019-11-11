import React from 'react'
import Meta from '../../component/meta/meta'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import AlgoliaPlaces from 'algolia-places-react';
import './partenaire.css'

class Partenaire extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            ville : ""
        }
        console.log(this.props.match.params.name, this.props.match.params.id)
    }

    render() {
        if (typeof this.props.match.params.name === "undefined" && typeof this.props.match.params.id === "undefined") {
            return (
                <MDBContainer className="mt-5">
                <MDBRow center>
                  <MDBCol xl="6" md="6">
                    <form>
                      <p className="h5 text-center mb-4">Connection</p>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                        />
                      </div>
                      <div className="text-center">
                        <MDBBtn className="w-100">Login</MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                  <MDBCol xl="6" md="6">
                    <form style={{paddingLeft : "40px"}} class="vl">
                      <p className="h5 text-center mb-4">Inscription</p>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                        />
                        <MDBInput
                          label="Type your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                        />
                        <MDBRow>
                        <MDBCol xl="1">
                        <MDBIcon size="2x" icon="map-marked-alt" />
                        </MDBCol>
                        <MDBCol xl="11">
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
                        
                        </MDBRow>
                      </div>
                      <div className="mt-5 text-center">
                        <MDBBtn className="w-100">Inscription</MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            )
        }
        else {
            return (
                <div>
                <Meta/>
                <h1>Partenaire</h1>
                </div>
            )
        }
    }
}

export default Partenaire