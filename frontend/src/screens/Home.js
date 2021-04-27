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

  render() {
    return (
      <View style={styles.container}>
        <Text>
          지도가 보여지는 홈화면
        </Text>
        <Button title={"여행가기"} onPress={this.startTravel}/>
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
