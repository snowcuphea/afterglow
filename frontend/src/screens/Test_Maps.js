// // import React, { useState } from 'react';
// // import {StyleSheet, View, Dimensions} from 'react-native';
// // import { MapView, Marker } from 'react-native-maps';
// // import MapViewDirections from 'react-native-maps-directions';

// // const Test_Maps = () => {
// //     const [coordinates] = useState([
// //       {
// //         latitude: 48.8587741,
// //         longitude: 2.2069771,
// //       },
// //       {
// //         latitude: 48.8323785,
// //         longitude: 2.3361663,
// //       },
// //     ]);
// //     return (
// //       <View style={styles.container}>
// //         <MapView
// //           style={styles.maps}
// //           initialRegion={{
// //             latitude: coordinates[0].latitude,
// //             longitude: coordinates[0].longitude,
// //             latitudeDelta: 0.0622,
// //             longitudeDelta: 0.0121,
// //           }}>
// //           <MapViewDirections
// //             origin={coordinates[0]}
// //             destination={coordinates[1]}
// //             apikey='AIzaSyCGLwsIiM-z2L8XLBFSZg_G3OCfh4acg7I' // insert your API Key here
// //             strokeWidth={4}
// //             strokeColor="#111111"
// //           />
// //           <Marker coordinate={coordinates[0]} />
// //           <Marker coordinate={coordinates[1]} />
// //         </MapView>
// //       </View>
// //     );
// //   };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   maps: {
// //     width: Dimensions.get('screen').width,
// //     height: Dimensions.get('screen').height,
// //   },
// // });

// // export default Test_Maps;


import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.56214048089164;
const LONGITUDE = 126.98781186361127;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const GOOGLE_MAPS_APIKEY = 'AIzaSyCGLwsIiM-z2L8XLBFSZg_G3OCfh4acg7I';

const styles = StyleSheet.create({
  versionBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  versionText: {
    padding: 4,
    backgroundColor: '#FFF',
    color: '#000',
  },
});

class Test_Maps extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        [37.57973601713675, 126.97703026928599],
        [37.50045755483594, 126.96977429055488]
      ],
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    console.log(e)
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  // 줌 효과?? 한 화면 안에 들어옴
  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 10),
        bottom: (height / 10),
        left: (width / 10),
        top: (height / 10),
      },
    });
  }

  // onError = (errorMessage) => {
  //   console.log(errorMessage); // eslint-disable-line no-console
  // }

  // setDistance(distance, duration_in_traffic) {
  //   // console.log('setDistance');
  //   this.setState({
  //     distance: parseFloat(distance),
  //     durationInTraffic: parseInt(duration_in_traffic)
  //   });
  // }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
          onPress={this.onMapPress}
        >
          <MapViewDirections
            // origin={this.state.coordinates[0]}
            origin={{ latitude: 37.57973601713675, longitude: 126.97703026928599 }}
            // destination={this.state.coordinates[this.state.coordinates.length-1]}
            destination={{ latitude: 37.50045755483594, longitude: 126.96977429055488 }}
            // waypoints={this.state.coordinates.slice(1,-1)}
            mode='DRIVING'
            apikey={GOOGLE_MAPS_APIKEY}
            language='ko'
            strokeWidth={4}
            strokeColor="black"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"${(params.waypoints.length ? " using waypoints: " + params.waypoints.join(', ') : "")}`);
            }}
            onReady={this.onReady}
            onError={(errorMessage) => {
              console.log(errorMessage);
            }}
            resetOnChange={false}
          />
        </MapView>
      </View>
    );
  }
}

export default Test_Maps;