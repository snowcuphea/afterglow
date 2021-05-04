import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class OnTravelMain extends React.Component {

  endDay = () => {
    this.props.navigation.navigate('SelectPicture')
  }

  endTravel = () => {
    this.props.navigation.navigate('SelectPicture')
  }

  selectPin = () => {

  }

  allPictures = () => {
    this.props.navigation.navigate('OnTravelAllPictures')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          여행 중 화면
        </Text>
        <Button title={"하루 끝"} onPress={this.endDay}/>
        <Button title={"여행 끝"} onPress={this.endTravel}/>
        <Button title={"핀을 눌렀을 때"} onPress={this.selectPin}/>
        <Button title={"사진 모아보기"} onPress={this.allPictures}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
