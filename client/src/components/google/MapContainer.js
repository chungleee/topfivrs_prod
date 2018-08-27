import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps'

const apiKey = process.env.REACT_APP_GOOGLEMAPS_API_KEY

class MapContainer extends Component {
  render() {
    const Map = withScriptjs(withGoogleMap((props) => {
      if(props.coords) {
        return (
          <GoogleMap
            center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            defaultZoom={16}
          >
            <Marker 
              position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            />
          </GoogleMap>
        )
      } else {
        return null
      }
    }))

    return (
      <div>
        <Map 
          coords={this.props.coords}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
          loadingElement={ <div style={{ height: '100%' }} />}
          containerElement={ <div style={{ height: '500px', width: '500px' }} /> }
          mapElement={ <div style={{ height:'100%'}} />}
        />
      </div>
    )
  }
}

export default MapContainer
