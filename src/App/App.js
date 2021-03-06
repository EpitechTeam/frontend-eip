import React from 'react';
import {withCookies, Cookies, CookiesProvider} from 'react-cookie';
import {instanceOf} from 'prop-types';
import getRoutes from './routes/routes'
import Header from '../component/header/header'
import Footer from '../component/footer/footer'
import MyCookies from '../component/cookies/cookies'
import "./app.css";

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super (props)
        this.state = { marginTop: false }
        if (typeof document !== "undefined")
            if (window.location.pathname !== "/") {
                this.state = { marginTop: true };
        }
    }

    render() {
        return (
            <CookiesProvider>
                <div>
                    <Header/>
                    <div id="main-body" style={{marginTop: this.state.marginTop ? "56px" : "", minHeight : "calc(100vh-56px)"}}>
                        {getRoutes(this.props.location)}
                    </div>
                    <MyCookies/>
                    <Footer location={this.props.location}/>
                </div>
            </CookiesProvider>
        )
    }
}

export default withCookies(App)
