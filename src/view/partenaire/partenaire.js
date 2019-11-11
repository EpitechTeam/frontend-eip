import React from 'react'
import Meta from '../../component/meta/meta'
import './partenaire.css'
import LoginRegister from './login-register.js/login-register'

class Partenaire extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            ville : ""
        }
        console.log(this.props.match.params.name, this.props.match.params.id)
    }

    render() {
        if (typeof this.props.match.params.name === "undefined" || typeof this.props.match.params.id === "undefined") {
            return <LoginRegister/>
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