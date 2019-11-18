import React from 'react'
import { MDBInput, MDBBtn } from 'mdbreact'
import { login } from '../../reducer/authenticate'
import {connect} from "react-redux";
import { MDBAlert } from "mdbreact";

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
    }
  }
}

class Login extends React.Component {
    constructor(props) {
      super (props)
      this.state = {
        email : "",
        password : ""
      }
    }

    handleChange = event => {
      this.setState({[event.target.name] : event.target.value})
    }

    checkForm = () => {
      this.props.login(this.state.email, this.state.password)
    }

    render () {
        return (
           <div>
                  <p className="h5 text-center mb-4">Connection</p>
                  {
                    this.props.authenticate.erreurLoginMessage !== "" ?
                    <MDBAlert color="danger">{this.props.authenticate.erreurLoginMessage}</MDBAlert>
                    : ""
                  }
                  <div className="grey-text">
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
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={this.checkForm} className="w-100">Connection</MDBBtn>
                  </div>
          </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
