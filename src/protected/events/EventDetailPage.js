import React, {Component} from 'react'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import type {Event} from "./EventsPage";
import {Button} from "antd";
import {Header, Text} from "./EventsPage";

class EventDetailPage extends Component {
  render() {
    const event: Event = this.props.event
    if (!event) {
      return <div>Loading...</div>
    }
    return (
      <div style={{
        background: '#0071BD',
        color: 'white',
      }}>
        <div style={{display: 'inline-box'}}>
          <div style={{float: 'left', minWidth: '500px'}}>
            <Header style={{color: '#F38A1F'}}>{event.title.toUpperCase()}</Header>
            <div>
              <Text>{event.datetime}</Text>
              <Text>{event.place.name}</Text>
              <Text>{event.place.location.address}</Text>
              <Text>{event.people.accepted.length + "/" + event.people.required}</Text>
            </div>
            <h2 style={{color: '#F38A1F'}}>DESCRIPTION</h2>
            <div>{event.description}</div>
            <iframe
              width="600"
              height="450"
              frameBorder="0" style={{border: 0}}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBHkIqeZVPecXjpr1Z3NJDNB6PFh-ZgFbc&q=${event.place.name} ${event.place.location.address}`}
              allowFullScreen>
            </iframe>
          </div>
          <div>
            <h2 style={{color: '#FA8C16', fontStyle: 'bold'}}>Level {event.level}</h2>
            <img src={'/imgs/level' + event.level + '.svg'} height={500}/>
          </div>
        </div>
        <Button type="primary">JOIN</Button>
      </div>
    )
  }
}

export default compose(
  firestoreConnect((props) => [
    {collection: 'events'} // or `todos/${props.todoId}`
  ]), // or { collection: 'todos' }
  connect((state, props) => ({
    event: state.firestore.ordered.events && state.firestore.ordered.events.filter(it => it.id === props.match.params.id)[0]
  }))
)(EventDetailPage)
