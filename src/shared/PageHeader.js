import React, {Component} from 'react'
import {Layout, Menu} from 'antd';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import isLoggedIn from "./isLoggedIn";
import Logout from "../public/login/Logout";
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Header = styled.header`
  height: 64px;
  background: #262626;
  color: #F38A1F; 
`
const MenuItem = styled(Link)`
  font-size: 1.5em;
  color: #F38A1F;
   &:hover {
    color: white;
   }
   margin-left: 2em;
   margin-right: 2em;
   line-height: 3em;
   text-decoration: none;
`


class PageHeader extends Component {
  render() {
    return isLoggedIn(this.props.auth)
      ?
      <Header>
        <MenuItem to="/profile">PROFILE</MenuItem>
        <MenuItem to="/events">EVENT LIST</MenuItem>
        <MenuItem to="/top-gamers">TOP GAMERS</MenuItem>
        <MenuItem to="/chat">CHAT</MenuItem>
        <MenuItem to="/search">SEARCH</MenuItem>
        <MenuItem to="/eshop">ESHOP</MenuItem>
      </Header>


      :
      null


  }
}

// {/*<Header><Menu*/}
// {/*theme="dark"*/}
// {/*mode="horizontal"*/}
// {/*defaultSelectedKeys={['2']}*/}
// {/*style={{lineHeight: '64px'}}*/}
// {/*>*/}
// {/*<Menu.Item key="2"><Logout/></Menu.Item>*/}
// {/*</Menu>*/}
// {/*</Header>*/}

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => {
    return ({auth})
  })
)(PageHeader)
