import React, { useRef } from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";


const INITIAL_REGION = {
  latitude: 35.83463069429124, 
  longitude: 127.75646977566188,
  latitudeDelta: 6.3,
  longitudeDelta: 1,
};

class Maps_cluster extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      loca: [
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 37.50053382130016, longitude: 126.90218984745893
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        },
        {
          latitude: 33.38318664501014, longitude: 126.53454671251562
        }
    
      ]
    }
  }


  render() {
    return (
      <MapView 
        initialRegion={INITIAL_REGION} 
        style={{ flex: 1 }} 
      >
          {
            this.state.loca.map((contact, i) => {
                return (
                    <Marker
                        coordinate={{ latitude: contact.latitude + (i*0.01), longitude: contact.longitude + (i*0.01) }}
                        onPress={() => this.props.navigation.navigate('EndTravelMain', {lat: contact.latitude+(i*0.01), lon:contact.longitude+(i*0.01)})}
                        key={i}
                    ></Marker>
                )
            })
          }
      </MapView>
  
    )
  }
}

export default Maps_cluster;