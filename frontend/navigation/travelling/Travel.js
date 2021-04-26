import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class Travel extends React.Component {

  static navigationOptions = {
    // headerShown: false,
    headerRight: false,
  };

  toAllImages = () => {
    this.props.navigation.navigate('AllImages')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          여행중 화면
        </Text>
        <Button title={'사진 모아보기'} onPress={this.toAllImages}/>
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