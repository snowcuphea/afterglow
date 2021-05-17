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

import MapView, { Marker, Callout, Polyline, Polygon, Circle } from "react-native-maps";

import Ionicons from 'react-native-vector-icons/Ionicons';

import PlaceList from '../../components/PlaceList'

import { connect } from 'react-redux'
import ActionCreator from '../.././store/actions'


import { CommonActions } from '@react-navigation/native'
import { round } from 'react-native-reanimated';
// import Map_In_Main from '../../components/Map_In_Main'

class EndTravelMain extends React.Component {
  


  constructor (props) {
    super(props)
  }

  startDay = async () => {
    await this.props.startNewDay(this.props.rec_id)
    await this.props.changeStatus('onTravel')
    await this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'OnTravelMain'},
        ]
      })
    )

  }

  saveRecord = async () => {
    this.props.changeStatus('rest')
    await this.props.getRecordListReq()
    await this.props.selectIndex(this.props.index)
    await this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'SingleTravelHistory'},
        ]
      })
    )
  }

  componentDidMount () {
    // console.log('테스트', this.props.travelStatus)
  }

  render() {
    // console 보고 .latitude 같은 것들 추가해야 함
    // const lat = this.props.todayTravel.todaycoords.lat
    // const lon = this.props.todayTravel.todaycoords.lon
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
          {/* 지도, 폴리라인, 그날 여행에서 찍힌 마커 */}
          <MapView
              style={{ flex:1}}
              region = {{
                  latitude: 37.5172,
                  longitude: 127.0473,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.05

              }}
          >
            {/* <Polyline
            coordinates={{"좌표"}}
            strokeColor='red'
            strokeWidth={1}
          ></Polyline> */}

          {/* {
            this.props.todayTravel.map((marker, index) => (
              <Marker
                coordinate={marker.tempPinList}
                key={index}
                title={marker.title}
                onPress={()=> {}}
              />
            ))
          } */}
          </MapView>
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
    fontSize: 20, marginLeft: 20, marginTop: 10,
  }
})


function mapStateToProps(state) {

  return {
    user_nickname: state.accountRd.user.usr_nickname,
    travelStatus: state.accountRd.travelStatus,
    rec_id: state.accountRd.travelingId,
    index: state.accountRd.traveledList.length-1,
    todayTravel: state.accountRd.todayTravel,
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
    },
    selectIndex: (index) => {
      dispatch(ActionCreator.selectIndex(index))
    },
    getRecordListReq: () => {
      dispatch({
        type: 'GET_RECORD_LIST_ASYNC'
      })
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EndTravelMain) 