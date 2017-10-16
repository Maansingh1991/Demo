import React from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow, OverlayView} from "react-google-maps";
import axios from 'axios';
const SimpleClickEventExampleGoogleMap = withGoogleMap(props => (

  <GoogleMap
    ref={props.onMapMounted}
    zoom={props.zoom}
    center={props.center}
  >



    {props.markers && props.markers.map(marker => (

      <Marker
        {...marker}

      >


        </Marker>
    )
    )}




  </GoogleMap>
));

const INITIAL_CENTER = {lat: 28.619570, lng: 77.088104};


class MapComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom: 14, hideInfo: true,
      center: '',markers:[],data:[]
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleCenterChanged = this.handleCenterChanged.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);

  }

  componentDidMount(){
this.apiCall()
  }
  apiCall=()=>{
    var that=this;

    axios.get('http://localhost:3000/coordinates')
      .then(function (response) {

        that.setState({data: response.data,makers:response.data.map((value)=>{

          return {
            position: {
              lat:  value.coordinates.coordinates[0],
              lng:value.coordinates.coordinates[1],
            },
            key: `Resident`,
            defaultAnimation: 10,
          }
        })})

      })
      .catch(function (error) {
        console.error(error)
      });
  }

  componentWillReceiveProps(props) {

    this.setState({
      zoom: 5, hideInfo: true,
      center: {
        lat:  28.619570,
        lng:  77.088104
      },
      markers: [{
        position: {
          lat:  28.619570,
          lng:77.088104,
        },
        key: `Resident`,
        defaultAnimation: 5,
      }]
    });
  }

  handleMapMounted(map) {
    this._map = map;
  }

  getPixelPositionOffset(width, height) {
    return {x: -(width / 2), y: -(height / 2)};
  }

  handleMarkerClick() {
    this.setState({
      zoom: 5, hideInfo: !this.state.hideInfo
    });
  }

  handleCenterChanged() {
    const nextCenter = this._map.getCenter();
    if (nextCenter.equals(new google.maps.LatLng({
        lat: 28.619570,
        lng: 77.088104
      }))) {
      return;
    }
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
    this._timeoutId = setTimeout(() => {
      this.setState({center: INITIAL_CENTER});
      this._timeoutId = null;
    }, 0);

    this.setState({
      // Because center now is a controlled variable, we need to set it to new
      // value when "center_changed". Or in the next render it will use out-dated
      // state.center and reset the center of the map to the old location.
      // We can never drag the map.
      center: nextCenter,
    });
  }

  componentWillUnmount() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  render() {

    return (


      <SimpleClickEventExampleGoogleMap
        containerElement={
          <div style={{height: `100%`}}/>
        }
        mapElement={
          <div style={{height: `100%`}}/>
        }
        zoom={15}

        center={{
          lat: parseFloat(28.619570),
          lng: parseFloat(77.088104)
        }}
        hideInfo={this.state.hideInfo}
        onMapMounted={this.handleMapMounted}
        getPixelPositionOffset={this.getPixelPositionOffset}
        onMarkerClick={this.handleMarkerClick}
        markers={this.state.markers}
      />
    );
  }
}


export default MapComponent;
