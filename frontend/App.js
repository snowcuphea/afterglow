import React, { useCallback, useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import appConfig from './app.json';


import {
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import { connect, Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { NavigationContainer } from '@react-navigation/native'

import DrawerComponent from './src/Drawer'

import store from './src/store/index'

import { setCustomText } from 'react-native-global-props'

const persistor = persistStore(store)

const customTextProps = {
  style : {
    fontFamily: 'RIDIBatang'
  }
};

setCustomText(customTextProps);

export default class App extends React.Component {

  

  render() {
    


    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <DrawerComponent />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    )
  }
}