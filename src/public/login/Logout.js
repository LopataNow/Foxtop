import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

const Logout = ({ firebase, auth }) => (
    <span // <GoogleButton/> button can be used instead
      onClick={() => {
        firebase.logout()
        window.location.pathname = ""
      }}
    >LOGOUT</span>
)

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => {
    return ({ auth })
  })
)(Logout)