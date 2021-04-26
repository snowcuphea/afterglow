import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';


class DaySaveImages extends React.Component {

  savePictures = () => e => {
    console.log("사진저장")
  }

  static navigationOptions = {
    headerLeft: () => (
      false
    ),
    headerRight: () => (
      <TouchableOpacity 
      style={{paddingRight: 10}}
      onPress={() => this.props.navigation.navigate('DayEnd')}
      >
        <Text>저장</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          하루 끝 사진 저장 페이지
        </Text>
        <Button title={'하루 끝 화면으로'} onPress={() => this.props.navigation.navigate('DayEnd')}></Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default DaySaveImages;