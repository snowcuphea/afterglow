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

export default class AfterTravelMain extends React.Component {

  selectPin = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          여행 끝 화면
        </Text>
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
