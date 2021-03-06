import React from 'react'
import { MDBInput, MDBBtn, MDBAlert } from 'mdbreact'
import { login, forgotMDP } from '../../reducer/authenticate'
import {connect} from "react-redux";
import './login.css'

const mapStateToProps = (state) => {
  return {
    authenticate : state.authenticate,
    language : state.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    },
    sendEmailForgotMDP: (email) => {
      dispatch(forgotMDP(email))
    }
  }
}

class Login extends React.Component {
    constructor(props) {
      super (props)
      this.state = {
        email : "",
        password : "",
        forgotMDP : false
      }
    }

    handleChange = event => {
      this.setState({[event.target.name] : event.target.value})
    }

    checkForm = () => {
      this.props.login(this.state.email, this.state.password)
    }

    sendEmailForgotMDP = () => {
      if (this.state.email !== "" && this.state.email.indexOf('@') !== -1 && this.state.email.indexOf('.') !== -1) {
        this.props.sendEmailForgotMDP(this.state.email)
      }
    }

    setForgotMDP = () => {
      this.setState({forgotMDP : true})
    }

    render () {
        if (this.state.forgotMDP) {
          return (
            <div>
                  {
                    this.props.authenticate.erreurLoginMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.props.authenticate.erreurLoginMessage}</MDBAlert>
                    : ""
                  }
                  <div className="grey-text mt-5">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      name="email"
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={this.sendEmailForgotMDP} className="w-100">Envoyer un email</MDBBtn>
                  </div>
          </div>
          )
        }
        return (
           <div>
                  {
                    this.props.authenticate.erreurLoginMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.props.authenticate.erreurLoginMessage}</MDBAlert>
                    : ""
                  }
                  <div className="grey-text mt-5">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      name="email"
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      name="password"
                      type="password"
                      validate
                      onChange={this.handleChange}
                    />
                    <p onClick={this.setForgotMDP}className="fakeLink">Mot de passe oublié</p>
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={this.checkForm} className="w-100">Connexion</MDBBtn>
                  </div>
          </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
