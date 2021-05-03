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

export default class TravelHistoryMain extends React.Component {

  selectHistory = () => {
    this.props.navigation.navigate('SingleTravelHistory')
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>
          지도에서 핀 찍으면 보이는 내 여행 기록 보기 화면
        </Text>
        <Button title={"여행 1 상세보기"} onPress={this.selectHistory}/>

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
