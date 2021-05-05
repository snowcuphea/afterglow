import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PlaceList from '../../components/PlaceList'
import PicturesHorz from '../../components/picture/PicturesHorz'

export default class EndTravelMain extends React.Component {


  // sharePicture = () => {
  //   this.props.navigation.navigate('AfterTravelShare')
  // }

  render() {
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.dateContainer}>
            <View style={{ marginLeft:5, backgroundColor : 'pink'}}>
              <Text>날짜와 버튼 보여주는 영역</Text>
            </View>
            <TouchableOpacity style={{ marginRight:5, backgroundColor:'purple'}}>
              <Text>기록 저장</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text>지도 보여주는 영역</Text>
        </View>
          
        <PlaceList />
        
        <View style={styles.bookContainer}>
          <Text>가계부 보여주는 영역</Text>
        </View>

        {/* <Button title={'사진 공유하기'} onPress={this.sharePicture}/> */}
      </ScrollView>
    )
  }
}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  dateContainer: {
    flexDirection: 'row',
    height: screenHeight/15,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mapContainer: {
    height: screenHeight/3,
    backgroundColor: 'green'
  },
  bookContainer: {
    height: 500,
    backgroundColor: 'red'
  }
})
