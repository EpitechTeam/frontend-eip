import React from 'react'
import BackgroundHome from './background/background'
import ExplicationEtape from './explication-etape/explication'

class Home extends React.Component {
    render () {
        return (
            <div>
            <BackgroundHome/>
            <ExplicationEtape/>
            </div>
        )
    }
}

export default Home