import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class Home extends React.Component {

  // static navigationOptions = {
  //   headerShown: false,
  // };

  startTravel = () => {
    console.log("여기")
    this.props.navigation.navigate('Travel')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          지도가 보여지는 홈화면
        </Text>
        {/* <Button title={"여행하기"} onPress={this.startTravel}/> */}
        <Button
          title="Go to Home Screen"
          onPress={() => this.props.navigation.navigate('Travel')}
        />
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

export default Home;