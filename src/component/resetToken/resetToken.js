import React from 'react'
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact'
import { resetMDP } from '../../reducer/authenticate'
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        porfile: state.porfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetMDP: (token, password) => { dispatch(resetMDP(token, password))},
    }
}

class ResetToken extends React.Component {
    state = {
        password : "",
        password1 : ""
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    saveNewMDP = () => {
        if (this.state.password === this.state.password1) {
            this.props.resetMDP(this.props.match.params.token, this.state.password)
        }
    }

    render() {
        return (
            <div className="mt-5">
            <MDBContainer className="mt-5">
            <MDBRow className="mt-5" center>
            <MDBCol className="mt-5" md="6">
            <h1 style={{textAlign : "center"}}>Réinitialiser votre mot de passe</h1>
            <label htmlFor="password" className="grey-text">
                Mot de passe
                </label>
                <input
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                type="password"
                id="password"
                className="form-control"
                />
                <br />
                <label htmlFor="password1" className="grey-text">
                Confirmez votre mot de passe
                </label>
                <input
                value={this.state.password1}
                onChange={this.handleChange}
                name="password1"
                type="password"
                id="password1"
                className="form-control"
                />
                <br />
                <div className="text-center mt-4">
                <MDBBtn onClick={this.saveNewMDP} className="w-100" color="unique" type="submit">
                    Réinitialiser
                </MDBBtn>
                </div>
            </MDBCol>    
            </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetToken)