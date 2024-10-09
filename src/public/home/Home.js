import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
import isLoggedIn from "../../shared/isLoggedIn";
import {Redirect} from "react-router-dom"; // optional


const Home = ({firebase, auth}) => (
  <div style={{
    textAlign: 'center',
    background: '#0071BD',
    height: '100vh'
  }}>
    <div style={{
      position: 'absolute',
      top: '200px',
      right: '400px'
    }}>
      <div>
        {
          isLoggedIn(auth) ? <Redirect to={"/profile"}/> : null
        }
      </div>
    </div>
    <div>
      <img src="/imgs/login-fox.svg" style={{height: '800px'}}/>
      <div style={{
        position: 'absolute',
        left: 'calc(50% - 160px)',
        top: '650px'
      }}>
      <img onClick={() => firebase.login({provider: 'google', type: 'popup'})} src="/imgs/google.svg" style={{width: '60px', marginRight: '100px', cursor: 'pointer'}}/>
      <img src="/imgs/fb.svg" style={{width: '60px'}}/>
      </div>
    </div>
  </div>
)

Home.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({firebase: {auth}}) => {
    return ({auth})
  })
)(Home)
