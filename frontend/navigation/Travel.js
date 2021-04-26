import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class Travel extends React.Component {

  // static navigationOptions = {
  //   headerShown: false,
  // };


  render() {
    return (
      <View style={styles.container}>
        <Text>
          여행중 화면
        </Text>
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

export default Travel;