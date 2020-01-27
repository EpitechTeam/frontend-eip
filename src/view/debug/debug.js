import React from 'react'
import { connect } from 'react-redux'
import { sendNewMission } from '../../reducer/debug'
import AlgoliaPlaces from 'algolia-places-react';
import { MDBContainer, MDBRow, MDBCol, MDBAlert, MDBBtn } from 'mdbreact'

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        language: state.language,
        profile: state.profile,
        debug : state.debug
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendNewMission: (token, body) => {
            dispatch(sendNewMission(token, body))
        }
    }
}

class DebugMission extends React.Component {
    state = {
        erreurDebugMessage : "",
        name : "",
        object : "",
        houseOwner : "",
        status : "",
        statusNb : "1",
        date : "08/11/2019",
        city : "",
        img : "https://static.ferienhausmiete.de/pictures/22582/bilder_original/22582_59625499104451.jpg",
        deal : "",
        user_id : ""
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    sendNewMission = async () => {
        await this.setState({user_id : this.props.profile.profile.id})
        await this.props.sendNewMission(this.props.authenticate.token, this.state)
    }

    componentDidMount() {
        this.setState({user_id : this.props.profile.profile.id})
    }

    render() {
        return (
            <div>
            <MDBContainer>
            <MDBRow center>
            <MDBCol md="6" className="mt-5">
            <p className="h4 mt-3 text-center mb-4">Création d'une mission</p>
                {
                    this.state.erreurDebugMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.state.erreurDebugMessage}</MDBAlert>
                    : ""
                }
                <label htmlFor="name" className="grey-text">
                Nom de la mission
                </label>
                <input
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                type="text"
                id="name"
                className="form-control"
                />
                <br />
                <label htmlFor="object" className="grey-text">
                Objet de la mission
                </label>
                <input
                value={this.state.object}
                onChange={this.handleChange}
                name="object"
                type="text"
                id="object"
                className="form-control"
                />
                <br />
                <label htmlFor="houseOwner" className="grey-text">
                Nom du propriétaire
                </label>
                <input
                value={this.state.houseOwner}
                onChange={this.handleChange}
                name="houseOwner"
                type="text"
                id="houseOwner"
                className="form-control"
                />
                <br />
                <label
                htmlFor="status"
                className="grey-text"
                >
                Status de la missions, exemple : DONE
                </label>
                <input
                onChange={this.handleChange}
                name="status"
                type="text"
                id="status"
                className="form-control"
                />
                <br />
                <label
                htmlFor="statusNb"
                className="grey-text"
                >
                Status (-1 à 2)
                </label>
                <input
                onChange={this.handleChange}
                name="statusNb"
                type="text"
                id="statusNb"
                className="form-control"
                />
                <br />
                <label htmlFor="date" className="grey-text">
                Date de la mission
                </label>
                <input
                value={this.state.date}
                onChange={this.handleChange}
                name="date"
                type="date"
                id="date"
                className="form-control"
                />
                <br />
                <label htmlFor="deal" className="grey-text">
                Deal
                </label>
                <input
                value={this.state.deal}
                onChange={this.handleChange}
                name="deal"
                type="number"
                id="deal"
                className="form-control"
                />
                <br />
                <label htmlFor="city" className="grey-text">
                Ville
                </label>
                <div id="searchDevenirFreelance" className="form-lg">
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
                this.setState({city : suggestion.name})}
        
                onLimit={({ message }) => 
                console.log('Fired when you reached your current rate limit.')}
        
                onError={({ message }) => 
                console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                />
                </div>    
                <div className="text-center mt-4">
                <MDBBtn onClick={this.sendNewMission} className="w-100" color="unique" type="submit">
                    Sauvegarder
                </MDBBtn>
                </div>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DebugMission)