import React, {Component} from 'react'
import {Layout} from 'antd';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";

const {Header, Footer, Sider, Content} = Layout;

class PageFooter extends Component {
  render() {
    return (
      null
    )
  }
}

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => {
    return ({auth})
  })
)(PageFooter)
