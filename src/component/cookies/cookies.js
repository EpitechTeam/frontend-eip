import React from 'react'
import './cookies.css'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from 'mdbreact';

const mapStateToProps = (state) => ({language: state.language, myCookies: state.myCookies})

const mapDispatchToProps = (dispatch) => {
    return {
      setCookies: (payload) => {
        dispatch({
          type : "SET_COOKIES",
          payload : payload
        })
      }
    }
  }

export class MyCookies extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
      super(props)

      this.state = {
        show : false
      }
    }

    toggle = () => {
      this.setState({show : false})
      const { cookies } = this.props;

      var timeExpire = new Date();
      timeExpire.setDate(timeExpire.getDate()+7);

      cookies.set('isCookies', false, {
          path: '/',
          expires: timeExpire
      })
      this.props.setCookies("false")
    }

    componentDidMount() {
        if (this.props.isCookies) {
            this.props.setCookies(this.props.isCookies)
            this.props.myCookies.myCookies = this.props.isCookies
        }
        else {
            const {cookies} = this.props
            if (cookies.get('isCookies') && cookies.get('isCookies') === "false") {
                this.props.setCookies("false")
            }
            else {
              this.props.setCookies("true")
              this.setState({show : true})
            }
        }
    }

    renderContent() {
        if (this.props.myCookies.myCookies === "true") {
          if (isMobile || this.props.language.mobile) {
            return (
              <MDBContainer className="positionCookies">
              <MDBRow>
              <MDBCol xs="9">
              {this.props.language.langue === "fr" ? "Nous utilisons des cookies pour nous permettre de mieux comprendre comment le site est utilisé. En continuant à utiliser ce site, vous acceptez cette politique." : "Accept cookies"}
              </MDBCol>
              <MDBCol xs="3">
              <MDBBtn size="sm" onClick={this.toggle}>OK</MDBBtn>
              </MDBCol>
              </MDBRow>
              </MDBContainer>
            )
          }
          else {
            return (
              <MDBContainer id="cookiesModal">
              <MDBModal isOpen={this.state.show} toggle={this.toggle}  backdrop={false}  size="lg"  side  position="bottom-right">
              <MDBModalHeader toggle={this.toggle}>Cookies</MDBModalHeader>
              <MDBModalBody>
              <p style={{fontSize : "14px"}}>{this.props.language.langue === "fr" ? "Nous utilisons des cookies pour nous permettre de mieux comprendre comment le site est utilisé. En continuant à utiliser ce site, vous acceptez cette politique." : "Accept cookies"}</p>
              </MDBModalBody>
              <MDBModalFooter>
              <MDBBtn color="primary" onClick={this.toggle}>ACCEPTER</MDBBtn>
              </MDBModalFooter>
              </MDBModal>
              </MDBContainer>
            )
          }
        }
        else {
            return
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderContent()}
            </React.Fragment>
        )
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(MyCookies))