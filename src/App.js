import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./public/home/Home";
import Profile from "./protected/profile/Profile";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {Layout} from 'antd';
import PageHeader from "./shared/PageHeader";
import PageFooter from "./shared/PageFooter";
import PageSider from "./shared/PageSider";
import Login from "./public/login/Login";
import PlacesPage from "./protected/places/PlacesPage";
import EventsPage from "./protected/events/EventsPage";
import EventDetailPage from "./protected/events/EventDetailPage";
import Eshop from "./public/eshop/Eshop";

const {Content} = Layout;

interface State {
}

interface Props {
  auth: Object
}

const Wrap = (props) => (
  props.children
)

class App extends Component<Props, State> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          <Layout>
            <PageHeader/>
            <Layout style={{
              display: 'inline-block',
              background: '#0071BD'
            }}>
              <PageSider/>
              <Content style={{margin: '24px 16px 24px 236px', padding: 24, minHeight: 280}}>
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/places" component={PlacesPage}/>
                <Route path="/events" exact component={EventsPage}/>
                <Route path="/events/:id" component={EventDetailPage}/>
                <Route path="/eshop" component={Eshop}/>
              </Content>
            </Layout>
            <PageFooter/>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}


export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => {
    return ({auth})
  })
)(App)
