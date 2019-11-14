import React from 'react';
import {withCookies, Cookies, CookiesProvider} from 'react-cookie';
import {instanceOf} from 'prop-types';
import getRoutes from './routes/routes'
import Header from '../view/header/header'
import Footer from '../view/footer/footer'
import MyCookies from '../component/cookies/cookies'

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    render() {
        return (
            <CookiesProvider>
                <div>
                    <Header/>
                    <div id="main-body">
                        {getRoutes(this.props.location)}
                    </div>
                    <MyCookies/>
                    <Footer/>
                </div>
            </CookiesProvider>
        )
    }
}

export default withCookies(App)
