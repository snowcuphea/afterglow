import React, { useRef } from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";

// let INITIAL_REGION = {
//   latitude: 37.55053382130016,
//   longitude: 126.99218984745893,
//   latitudeDelta: 6,
//   longitudeDelta: 1,
// };

// const Maps_cluster = () => {
//   const mapRef = useRef();

//   const animateToRegion = () => {
//     let region = {
//       latitude: INITIAL_REGION.latitude,
//       longitude: INITIAL_REGION.longitude,
//       latitudeDelta: INITIAL_REGION.latitude + 0.3,
//       longitudeDelta: INITIAL_REGION.longitudeDelta + 0.3,
//     };

//     mapRef.current.animateToRegion(region, 2000);
//   };
//   return (
    // <MapView 
    //   ref = {mapRef}
    //   initialRegion={INITIAL_REGION} 
    //   style={{ flex: 1 }}
    //   // onClusterPress={() => animateToRegion()}
    //   onClusterPress={() => {
    //     INITIAL_REGION.latitudeDelta = INITIAL_REGION.latitudeDelta - 0.3
    //     INITIAL_REGION.longitudeDelta = INITIAL_REGION.longitudeDelta - 0.3
    //     // mapRef.current.onClusterPress(INITIAL_REGION, 2000);
    //   }}
    //   >
    //   <Marker coordinate={{ latitude: 37.50053382130016, longitude: 126.90218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.51053382130016, longitude: 126.91218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.52053382130016, longitude: 126.92218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.53053382130016, longitude: 126.93218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.54053382130016, longitude: 126.94218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.55053382130016, longitude: 126.95218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.56053382130016, longitude: 126.96218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.57053382130016, longitude: 126.97218984745893 }} />
    //   <Marker coordinate={{ latitude: 37.58053382130016, longitude: 126.98218984745893 }} />
    // </MapView>

//   )
// };

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
                      // onPress={() => navigation.navigate('Maps'), {latitude: contact.latitude+(i*0.01), longtitude:contact.longitude+(i*0.01)}}
                      onPress={() => navigation.navigate('Map_In_Main', {lati: contact.latitude+(i*0.01), longi:contact.longitude+(i*0.01)})}
                      key={i}
                  ></Marker>
              )
          })
        }
    </MapView>

  )
    {/* <Marker coordinate={{ latitude: 37.50053382130016, longitude: 126.90218984745893 }} />
    <Marker coordinate={{ latitude: 37.51053382130016, longitude: 126.91218984745893 }} />
    <Marker coordinate={{ latitude: 37.52053382130016, longitude: 126.92218984745893 }} />
    <Marker coordinate={{ latitude: 37.53053382130016, longitude: 126.93218984745893 }} />
    <Marker coordinate={{ latitude: 37.54053382130016, longitude: 126.94218984745893 }} />
    <Marker coordinate={{ latitude: 37.55053382130016, longitude: 126.95218984745893 }} />
    <Marker coordinate={{ latitude: 37.56053382130016, longitude: 126.96218984745893 }} />
    <Marker coordinate={{ latitude: 37.57053382130016, longitude: 126.97218984745893 }} />
    <Marker coordinate={{ latitude: 37.58053382130016, longitude: 126.98218984745893 }} /> */}
}

export default Maps_cluster;