import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import GoogleButton from 'react-google-button'
import isLoggedIn from "../../shared/isLoggedIn";
import {Redirect} from "react-router-dom"; // optional

const Login = ({ firebase, auth }) => (
  <div>
    <GoogleButton // <GoogleButton/> button can be used instead
      onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
    />
    <div>
      {
        isLoggedIn(auth) ? <Redirect to={"/profile"}/> : null
      }
    </div>
  </div>
)

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => {
    return ({ auth })
  })
)(Login)