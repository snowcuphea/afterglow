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

export default class OnTravelShare extends React.Component {

  shareInsta = () => {
  }

  shareKakao = () => {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          사진 공유하기
        </Text>
        <Button title={"인스타 공유하기"} onPress={this.shareInsta}/>
        <Button title={"카카오 공유하기"} onPress={this.shareKakao}/>
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
