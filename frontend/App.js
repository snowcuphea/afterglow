import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


import { NavigationContainer } from '@react-navigation/native'

import DrawerComponent from './src/Drawer'

import store from './src/store/index'

import { setCustomText } from 'react-native-global-props'

const persistor = persistStore(store)

const customTextProps = {
  style : {
    fontFamily: 'RIDIBatang',
    fontSize: 18,
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

