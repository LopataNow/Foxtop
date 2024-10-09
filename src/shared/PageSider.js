import React, {Component} from 'react'
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import isLoggedIn from "./isLoggedIn";
import styled from "styled-components";
import Logout from "../public/login/Logout";

const MenuItem = styled(Link)`
  color: white;
  font-size: 1.5em;
  display: block;
  line-height: 2em;
`
const MenuItem2 = styled.span`
  color: white;
  font-size: 1.5em;
  display: block;
  line-height: 2em;
  cursor: pointer;
`
const Menu = styled.div`
  width: 220px;
  background: #262626;
  padding-left: 25px;
  float: left;
  
`

class PageSider extends Component {

  render() {
    return isLoggedIn(this.props.auth) ? (
          <Menu>
            <MenuItem to="/profile">PROFILE</MenuItem>
            <MenuItem to="/events">MY EVENTS</MenuItem>
            <MenuItem to="/places">PLACES</MenuItem>
            <MenuItem2><Logout/></MenuItem2>
          </Menu>
      )
      : null
  }
}

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => {
    return ({auth})
  })
)(PageSider)
