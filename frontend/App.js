import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {DrawerActions} from 'react-navigation-drawer'

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './navigation/Home'
import Travel from './navigation/travelling/Travel'
import AllImages from './navigation/travelling/AllImages';
import SingleImage from './navigation/travelling/SingleImage';

import HelloWorld from "./components/HelloWorld"


const openDrawer = () => {
  console.log("hello")
}

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Travel: {
      screen: Travel,
    },
    AllImages: {
      screen: AllImages,
    },
    SingleImage: {
      screen: SingleImage,
    },
    TravelStart: {
      screen: TravelStart,
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "pink"
      },
      headerRight: () => (
        <TouchableOpacity 
          style={{paddingRight: 10}}
          onPress={() => console.log("hello")}
        >
          <Ionicons name={'menu'} size={20} style={{ color: "black"}}/>
        </TouchableOpacity>
        )
    }
  }
);

const AppContainer = createAppContainer(App);

export default () => (
  <AppContainer />
);
