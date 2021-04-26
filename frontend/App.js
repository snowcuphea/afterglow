import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {DrawerActions} from 'react-navigation-drawer'

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './navigation/Home'
import Travel from './navigation/Travel'

import HelloWorld from "./components/HelloWorld"



const App = createStackNavigator(
  {
    Home: {
      screen: Home,
    }
  },
  {
    Travel: {
      screen: Travel,
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(App);

export default () => {
  <AppContainer />
}