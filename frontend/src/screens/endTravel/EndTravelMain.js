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

import { connect } from 'react-redux'
import ActionCreator from '../.././store/actions'


class EndTravelMain extends React.Component {

  constructor (props) {
    super(props)
  }

  startDay = () => {
    console.warn("해당 버튼을 누르면 여행이 시작")
  }

  saveRecord = () => {
    this.props.navigation.navigate('SingleTravelHistory')
  }

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
            { this.props.travelStatus === "dayEnd" ? 
              <TouchableOpacity style={{ marginRight:5, backgroundColor:'purple'}} onPress={this.startDay}>
                <Text>하루 시작</Text>
              </TouchableOpacity> :
              <TouchableOpacity style={{ marginRight:5, backgroundColor:'purple'}} onPress={this.saveRecord}>
                <Text>여행 끝</Text>
              </TouchableOpacity>
            }
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


function mapStateToProps(state) {

  return {
    travelStatus: state.accountRd.travelStatus,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch(ActionCreator.changeStatus(status))
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EndTravelMain) 