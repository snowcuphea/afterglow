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

export default class HomeScreen extends React.Component {

  startTravel = () => {
    this.props.navigation.navigate('OnTravelMain')
  }

  toImgs = () => {
    console.log('이미지')
    this.props.navigation.navigate('ToImgs')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          지도가 보여지는 홈화면
        </Text>
        <Button title={"여행하기"} onPress={this.startTravel}/>
        <Button title={"이미지 배열"} onPress={this.toImgs}/>
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
