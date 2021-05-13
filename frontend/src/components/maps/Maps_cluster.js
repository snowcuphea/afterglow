import React, { useRef } from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

const INITIAL_REGION = {
  latitude: 37.55053382130016,
  longitude: 126.99218984745893,
  latitudeDelta: 6,
  longitudeDelta: 1,
};


function Maps_cluster ({navigation}) {
  state = {
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
                      // onPress={() => navigation.navigate('Map_In_Main', {lat: contact.latitude+(i*0.01), lon:contact.longitude+(i*0.01)})}
                      key={i}
                  ></Marker>
              )
          })
        }
    </MapView>

  )
}

export default Maps_cluster;