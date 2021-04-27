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

export default class AfterTravelMain extends React.Component {

  selectPin = () => {
    
  }

  sharePicture = () => {
    this.props.navigation.navigate('AfterTravelShare')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          여행 끝 화면
        </Text>
        <Button title={'사진 공유하기'} onPress={this.sharePicture}/>
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
