import React from 'react'
import { MDBInput, MDBBtn } from 'mdbreact'

class Login extends React.Component {
    render () {
        return (
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
                    <MDBBtn className="w-100">Connection</MDBBtn>
                  </div>
            </form>
        )
    }
}

export default Login