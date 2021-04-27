import React from 'react'
import { View, TouchableOpacity, Text, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import DrawerComponent from './src/Drawer'

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <DrawerComponent />
      </NavigationContainer>
    )
  }
}

