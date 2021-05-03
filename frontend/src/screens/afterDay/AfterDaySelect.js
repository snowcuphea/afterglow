import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { CommonActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Pictures from '../.././components/picture/Pictures'
import PicturesHorz from '../.././components/picture/PicturesHorz'

export default class AfterDaySelect extends React.Component {

  

  savePicture = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'AfterDayMain'},
        ]
      })
    )
  }

  render() {
    return (
      <View>
        <View>
          <PicturesHorz />
        </View>

        <View>
          <Pictures navigation={this.props.navigation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})
