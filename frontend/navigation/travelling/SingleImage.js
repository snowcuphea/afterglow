import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


class SingleImage extends React.Component {

  // static navigationOptions = {
  //   headerShown: false,
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          사진 하나보기 페이지
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

export default SingleImage;