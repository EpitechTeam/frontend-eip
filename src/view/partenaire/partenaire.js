import React from 'react'
import Meta from '../../component/meta/meta'
import './partenaire.css'
import LoginRegister from './login-register.js/login-register'

class Partenaire extends React.Component {
    constructor(props) {
        super (props)
        console.log(this.props.match.params.name)
    }

    render() {
        return (
            <div>
            <Meta/>
            <h1>Profil Page de {this.props.match.params.name}</h1>
            </div>
        )
    }
}

export default Partenaire