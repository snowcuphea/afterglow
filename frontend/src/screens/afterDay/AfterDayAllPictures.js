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

export default class AfterDayAllPictures extends React.Component {

  sharePictures = () => {

  }

  selectPicture = () => {
    this.props.navigation.navigate('AfterDaySinglePicture')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          사진 모아보기
        </Text>
        <Button title={"사진 공유하기"} onPress={this.sharePictures}/>
        <Button title={"사진 하나 선택"} onPress={this.selectPicture}/>
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
