import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './navigation/Home'
import Travel from './navigation/travelling/Travel'
import AllImages from './navigation/travelling/AllImages';
import SingleImage from './navigation/travelling/SingleImage';
import DaySaveImages from './navigation/dayend/DaySaveImages'
import DayEnd from './navigation/dayend/DayEnd';


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
<<<<<<< HEAD
    TravelStart: {
      screen: TravelStart,
=======
    DaySaveImages: {
      screen: DaySaveImages,
    },
    DayEnd: {
      screen: DayEnd
>>>>>>> 26891759eef7409951f16abcaab6b63fc4fbc10c
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
          onPress={() => this.props.navigation.openDrawer()}
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
