import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Alert
} from 'react-native';

import MapView, { Marker, Callout, Polyline, Polygon, Circle } from "react-native-maps";

class Map_In_Main extends React.Component {
    render () {
        const { lati, longi } = this.props.route.params;

        // const latitude = Props_items.latitude
        // const longitude = Props_items.longitude

        return (
            <View style={{ flex:1 }}>
                <MapView
                    style={{ flex:1 }}
                    initialRegion = {{
                        latitude: lati,
                        longitude: longi,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1

                    }}
                >

                </MapView>
                <Text style={{ flex:2 }}>
                    하이
                </Text>

            </View>


        )

    }
}

export default Map_In_Main