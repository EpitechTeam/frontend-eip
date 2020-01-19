import React from 'react'
import { MDBInput, MDBBtn, MDBAlert } from 'mdbreact'
import {connect} from "react-redux";
import { registerProprietaire } from '../../reducer/authenticate'

const mapStateToProps = (state) => {
    return {
      authenticate : state.authenticate,
      language : state.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      register: (body) => {
        dispatch(registerProprietaire(body))
      }
    }
}

class CreateProprietaire extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
          email : "",
          password : "",
          name : "",
          lastname : ""
        }
    }
  
    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }
  
    checkForm = () => {
      console.log(this.state)
        this.props.register(this.state)
    }

    render() {
        return (
            <div>
                  {
                    this.props.authenticate.erreurLoginMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.props.authenticate.erreurLoginMessage}</MDBAlert>
                    : ""
                  }
                  <div className="grey-text mt-5">
                    <MDBInput
                    label="Prénom"
                    name="name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    onChange={this.handleChange}
                    success="right"
                    />
                    <MDBInput
                    label="Nom"
                    icon="user"
                    name="lastname"
                    group
                    type="text"
                    validate
                    error="wrong"
                    onChange={this.handleChange}
                    success="right"
                    />
                    <MDBInput
                    label="Email"
                    icon="envelope"
                    name="email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    onChange={this.handleChange}
                    success="right"
                    />
                    <MDBInput
                      label="Mot de passe"
                      icon="lock"
                      group
                      name="password"
                      type="password"
                      validate
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={this.checkForm} className="w-100">Inscription</MDBBtn>
                  </div>
          </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProprietaire)
