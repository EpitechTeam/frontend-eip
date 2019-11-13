import React from 'react'
import BackgroundHome from './background/background'
import ExplicationEtape from './explication-etape/explication'
import Meta from '../../component/meta/meta'
import HomeContent from "./home-content/home-content";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Meta/>
                <BackgroundHome/>
                <ExplicationEtape/>
                <HomeContent/>
            </div>
        )
    }
}

export default Home
