import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class AllImages extends React.Component {

  // static navigationOptions = {
  //   headerShown: false,
  // };

  toSingleImage = () => {
    this.props.navigation.navigate('SingleImage')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          사진 모아보기 페이지
        </Text>
        <Button title={'사진 하나보기'} onPress={this.toSingleImage}/>
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

export default AllImages;