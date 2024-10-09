import React, {Component} from 'react'
import {firestoreConnect} from "react-redux-firebase";
import {compose} from 'redux'
import {connect} from 'react-redux'
import Map from "./maps/Map";


export interface Place {
  name: String;
  location: {
    latitude: number;
    longitude: number;
    city: String;
    address: String;
  };
  info: {

  };
  placeId: String;
  reference: String;
}

interface Props {
  places: Array<Place>
}

class PlacesPage extends Component<Props, {}> {
  render() {
    return (
      <div>
<Map/>
      </div>
    )
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: 'places'} // or `todos/${props.todoId}`
  ]), // or { collection: 'todos' }
  connect((state, props) =>
  {
    return ({
      places: state.firestore.ordered.places ? state.firestore.ordered.places.map((it, index) => ({key: index, ...it})) : state.firestore.ordered.places
    })
  })
)(PlacesPage)
