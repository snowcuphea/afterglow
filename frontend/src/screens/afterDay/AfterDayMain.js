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

export default class AfterDayMain extends React.Component {

  selectPin = () => {
    
  }

  allPictures = () => {
    this.props.navigation.navigate('AfterDayAllPictures')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          하루끝 화면
        </Text>
        <Button title={"핀 선택하기"} onPress={this.selectPin}/>
        <Button title={"사진모아보기"} onPress={this.allPictures}/>
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
