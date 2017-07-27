import React, {Component} from 'react'
import GoogleMap from 'google-map-react'
import MiniStoreComponent from './MiniStoreComponent'

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;



export default class Map extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.props.mapChange(e.center.lat, e.center.lng)
  }

  checkForDuplicateLocations() {
    for(let m = 0; m < this.props.nearbyStores.length-1; m++) {
      console.log('----')
      console.log(this.props.nearbyStores[m])
      console.log(this.props.nearbyStores[m+1])
    }
    
  }
  render() {
    var markers = this.props.nearbyStores.map(store => {
      store.toggle = false;
      return <MiniStoreComponent key={store.id} store={store} toggle={{id: store.id, opened: false}}
              lat={store.latitude}
              lng={store.longitude}
            />
    })
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 95d5ea9... fixed up CSS more
=======
>>>>>>> parent of 95d5ea9... fixed up CSS more
    console.log(markers)
    console.log(this.props.curState)
    if(this.props.curState.latitude === null) {
      this.props.getUserLocation()
    }
    return (
      <div style={{width: '100%', height: '100%'}}>
      <GoogleMap
        bootstrapURLKeys={{
          key: "AIzaSyAHr8Z1lo-CaTqSk7jyuP2Zl66LVpDsz_M",
          language: 'en'
          }}
        center={[this.props.curState.latitude,this.props.curState.longitude]}
        zoom={17}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        hoverDistance={K_HOVER_DISTANCE}
        options={this.createMapOptions}
        onChange={this.handleChange}
      >
       {markers}
      </GoogleMap>       
      </div>
    )
  }

  createMapOptions () {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      disableDefaultUI: true,
      styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
    }
  }

  
}
