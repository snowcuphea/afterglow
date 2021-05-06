import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


import { NavigationContainer } from '@react-navigation/native'

import DrawerComponent from './src/Drawer'

import store from './src/store/index'

const persistor = persistStore(store)

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

