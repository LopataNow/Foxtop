import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom";
import {compose} from "redux";
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from "react-redux";
import isLoggedIn from "../shared/isLoggedIn";


const PublicComponent = ({component: Component, auth, ...rest}) => {
  return !isLoggedIn(auth) ? (
    <Component {...rest} />
  ) : (
    null
  )
};

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => {
    return ({auth})
  })
)(PublicComponent)