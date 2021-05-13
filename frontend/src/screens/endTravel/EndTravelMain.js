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


import { CommonActions } from '@react-navigation/native'

class EndTravelMain extends React.Component {

  constructor (props) {
    super(props)
  }

  startDay = () => {
    this.props.changeStatus('onTravel')
    this.props.startNewDay(this.props.rec_id)
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'OnTravelMain'},
        ]
      })
    )

  }

  saveRecord = () => {
    this.props.changeStatus('rest')
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'SingleTravelHistory'},
        ]
      })
    )
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

        <Text style={styles.titleStyle}>{this.props.user_nickname}님이 방문한 장소 </Text>  
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
  },
  titleStyle: {
    fontSize: 20, marginLeft: 20, marginTop: 10, fontFamily:'RIDIBatang'
  }
})


function mapStateToProps(state) {

  return {
    user_nickname: state.accountRd.user.nickname,
    travelStatus: state.accountRd.travelStatus,
    rec_id: state.accountRd.travelingId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch({
        type: "CHANGE_STATUS_ASYNC",
        payload: status
      })
    },
    startNewDay: (rec_id) => {
      dispatch({
        type: "START_DAY_ASYNC",
        payload: rec_id
      })
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EndTravelMain) 