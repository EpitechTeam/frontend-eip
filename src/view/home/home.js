import React from 'react'
import BackgroundHome from './background/background'
import ExplicationEtape from './explication-etape/explication'
import Meta from '../../component/meta/meta'
import HomeContent from "./home-content/home-content";
import { getHomeData } from '../../reducer/home';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHomeData: () => { dispatch(getHomeData())},
    }
};

class Home extends React.Component {
    constructor(props) {
        super(props)
        if (typeof document !== "undefined") {
            if (window.location.hostname === "localhost") {
                this.props.getHomeData()
            }
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
