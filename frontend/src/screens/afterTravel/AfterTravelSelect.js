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

export default class AfterTravelSelect extends React.Component {

  savePicture = () => {
    this.props.navigation.navigate('AfterTravelMain')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          여행 끝 사진 저장 화면
        </Text>
        <Button title={"저장"} onPress={this.savePicture}/>
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
