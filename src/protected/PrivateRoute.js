import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom";
import authService from "../shared/authService";
import {compose} from "redux";
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from "react-redux";
import isLoggedIn from "../shared/isLoggedIn";


const PrivateRoute = ({component: Component, auth,  ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn(auth) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => {
    return ({ auth })
  })
)(PrivateRoute)