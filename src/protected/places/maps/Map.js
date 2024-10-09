import React, {Component} from 'react'
import {compose, lifecycle, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {SearchBox} from "react-google-maps/lib/components/places/SearchBox"
import {getLocation} from "./locationService";
import _ from "lodash"
import {Place} from "../PlacesPage"

const placesApiKey = "AIzaSyCI0NQ4tT8VILUGE44sho-UKKLIgo3excU"
const mapsApiKey = "AIzaSyBHkIqeZVPecXjpr1Z3NJDNB6PFh-ZgFbc"

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`, width: `600px`}}/>,
    mapElement: <div style={{height: `100%`}}/>
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        search: this.props.search,
        bounds: null,
        center: {
          lat: +this.props.coords.latitude, lng: +this.props.coords.longitude
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const google = window.google
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          if (places.length) {
            const place = places[0]
            console.log(place)
            const p: Place = {
              name: place.name,
              location: {
                // latitude: place.geometry.location.lat,
                // longitude: place.geometry.location.lng,
                city: 'TODO',
                address: place.formatted_address
              },
              placeId: place.place_id,
              reference: place.reference
            }
            this.props.placeCallback(p)
          }
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
    return (
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        zoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `10px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {props.markers.map((marker, index) =>
          <Marker key={index} position={marker.position}/>
        )}
      </GoogleMap>
    )
  }
)

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    location: getLocation()
  }

  componentDidMount() {
    getLocation((location) => {
      this.setState({location})
      this.delayedShowMarker()
    })
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({isMarkerShown: true})
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({isMarkerShown: false})
    this.delayedShowMarker()
  }

  render() {
    return (
      this.state.location
        ?
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          coords={{...this.state.location.coords}}
          placeCallback={this.props.placeCallback}
          search={this.props.search}
        />
        : null
    )
  }
}

interface Props {
  placeCallback: (Place) => void
}

class Map extends Component<Props, {}> {
  render() {
    return (
      <MyFancyComponent placeCallback={this.props.placeCallback} search={this.props.search}/>
    )
  }
}

export default Map
