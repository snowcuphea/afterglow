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

  Pictures = () => {
    this.props.navigation.navigate('Pictures')
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>
          지도가 보여지는 홈화면
        </Text>
        <Button title={"여행하기"} onPress={this.startTravel}/>
        <Button title={"사진 업로드"} onPress={this.Pictures}/>
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
