import React from 'react'
import BackgroundHome from './background/background'
import ExplicationEtape from './explication-etape/explication'
import Meta from '../../component/meta/meta'

class Home extends React.Component {
    render () {
        return (
            <div>
            <Meta/>
            <BackgroundHome/>
            <ExplicationEtape/>
            </div>
        )
    }
}

export default Home