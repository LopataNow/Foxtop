import React, {Component} from 'react'
import {firestoreConnect} from "react-redux-firebase";
import {compose} from 'redux'
import {connect} from 'react-redux'
import Column from "antd/es/table/Column";
import Table from "antd/es/table/Table";
import {Button} from "antd";
import CreateEventForm from "./CreateEventForm";
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {firebaseConnect} from "react-redux-firebase";

export interface Event {
  title: String;
  description: String;
  place: Place;
  creator: String;
  people: {
    invited: Array<String>;
    accepted: Array<String>;
    refused: Array<String>;
    required: number;
  };
  game: String;
  datetime: String;
  level: number;
}

interface Props {
  events: Array<Event>;
}

interface State {
  showCreateForm: boolean
}

export const Header = styled.h2`
  font-size: 1.8em;
`
const Row = styled.div`
  
`
export const Text = styled.span`
    padding-right: 20px;
    font-size: 1.5em;
    font-weight: 400;
    color: white;
`

class EventsPage extends Component<Props, State> {
  state = {
    showCreateForm: false
  }

  render() {
    return (
      <div>
        <div>
          {this.state.showCreateForm
            ? <CreateEventForm closeCallback={this.closeForm} submitCallback={this.addEvent} me={this.props.auth}/>
            : <Button type="primary" onClick={this.showForm}>Create Event</Button>
          }
        </div>
        <div>

          {this.props.events ?
            this.props.events.map(event => (
              <div key={event.id}>
                <Header><Link to={'/events/' + event.id}>{event.title}</Link></Header>
                <Row>
                  <Text>{event.datetime}</Text>
                  <Text>{event.place.name}</Text>
                  <Text>{event.place.location.address}</Text>
                  <Text>{event.people.accepted.length+"/"+event.people.required}</Text>
                </Row>
                <hr/>
              </div>
            ))
            : null
          }
        </div>
      </div>
    )
  }

  showForm = () => {
    this.setState({showCreateForm: true})
  }
  closeForm = () => {
    this.setState({showCreateForm: false})
  }
  addEvent = (event: Event) => {
    if (this.props.events === undefined) {
      console.log("Firebase not ready")
      return
    }
    this.props.firestore.add('events', {...event})
  }
}

export default compose(
  firestoreConnect((props) => [
    {collection: 'events'} // or `todos/${props.todoId}`
  ]), // or { collection: 'todos' }
  firebaseConnect(),
  connect((state, props) => ({
    events: state.firestore.ordered.events ? state.firestore.ordered.events.map((it, index) => ({key: index, ...it})) : state.firestore.ordered.events,
    auth: state.firebase.auth
  }))
)(EventsPage)
