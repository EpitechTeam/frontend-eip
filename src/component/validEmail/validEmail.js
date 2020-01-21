import React from 'react' 
import { connect } from 'react-redux'
import { validEmail } from '../../reducer/freelanceProfile';

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        freelanceProfile: state.freelanceProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validEmail: (id) => { dispatch(validEmail(id))},
    }
};

class ValidEmail extends React.Component {
    componentDidMount() {
        this.props.validEmail(this.props.match.params.id)
    }

    render() {
        return (
            <div className="marginHeader">
            Votre email est vérifié, vous allez être redirigé...
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidEmail)