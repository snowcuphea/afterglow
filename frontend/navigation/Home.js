import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { Header } from 'react-native-elements'

import Ionicons from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {

  openDrawer = () => {
    console.log("drawer")
  }

<<<<<<< HEAD
  static navigationOptions = {
    headerRight: (
      <TouchableOpacity 
        style={{paddingRight: 10}} 
        onPress={this.openDrawer}
      >
        <Ionicons name={'menu'} size={20} style={{ color: "black"}}/>
      </TouchableOpacity>
    ),
  };
=======
>>>>>>> 26891759eef7409951f16abcaab6b63fc4fbc10c

  startTravel = () => {
    console.log("여기")
    this.props.navigation.navigate('Travel')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header
          leftComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        /> */}
        <Text>
          지도가 보여지는 홈화면
        </Text>
        <Button title={"여행하기"} onPress={this.startTravel}/>
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

export default Home;