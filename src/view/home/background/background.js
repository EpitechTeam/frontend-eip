import React from 'react'
import './background.css'
import SearchHome from '../search/search'

class BackgroundHome extends React.Component {
    render() {
        return (
            <div className="backgroundHome">
            <SearchHome/>
            </div>
        )
    }
}

export default BackgroundHome