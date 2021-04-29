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

  reduxTest = () => {
    this.props.navigation.navigate('Counter')
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <Header
          leftComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        /> */}
        <Text style={styles.textStyle}>
          지도가 보여지는 홈화면
        </Text>
        <Button title={"여행하기"} onPress={this.startTravel}/>
        <Button title={"사진 업로드"} onPress={this.Pictures}/>
        <Button title={"REDUX TEST"} onPress={this.reduxTest}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontFamily: 'RIDIBatang',

  }

})
