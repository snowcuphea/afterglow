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

import MoneyBook from '../../components/book/MoneyBook'
import AddMoneyItem from '../../components/book/AddMoneyItem'
import PlaceList from '../../components/PlaceList'
import RecPlaceList from '../../components/RecPlaceList'
import ModalDayFinish from '../../components/modal/ModalDayFinish'
import PinClickPage from '../../components/PinClickPage'

import { connect } from 'react-redux'
import ActionCreator from '../.././store/actions'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import MapView, { Marker, Callout, Polyline, Polygon, Circle } from "react-native-maps";

import Geolocation from 'react-native-geolocation-service';



class OnTravelMain extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: '',
      passedTime: '',
      clickPin: false,
      selectedPin : null,
      lat : 0,
      lon : 0,
    }
  }

  allPictures = () => {
    this.props.navigation.navigate('ShowPictures');
    this.props.modePicture('look');
    this.props.emptyList();
  }

  //핀 눌렀을 때 끌지 안끌지만 설정하는 함수 
  selectPinFunc = (val) => {
    this.setState({ ...this.state, clickPin: val });
    // console.log("핀상태",this.state.clickPin )
  }


  //핀 눌렀을 때 어떤 핀 눌렀는지까지 저장되는 함수
  newSelectPinFunc = (val) => {
    console.log("newSelectPinFunc val??", val)
    this.setState({
      ...this.state,
      selectedPin: val,
      clickPin: true,
    });
    
  }


  dateForm(date) {
    try {
      const tempDate = date.split('-')
      return tempDate[0] + '년 ' +tempDate[1] + '월 ' + tempDate[2] + '일 '
    } catch (error) {
      return null
    }
  }

  timeForm(time) {
    try {
      const tempTime = time.split(':')
      const hours = Number(tempTime[0])
      const mins = Number(tempTime[1])
    
      return hours > 0 ? ( mins > 0 ? hours + '시간 ' + mins + '분' : hours+'시간') :
              ( mins > 0 ? mins + '분' : '여행을 시작했습니다.' )
    } catch (error) {
      // console.log(error)
      return '여행을 시작했습니다.'
    }
  }

  componentDidMount () {
    

    Geolocation.getCurrentPosition(
      (position) => {
        // 확인 완료
        // console.log('현재 위치 확인용', position)
        // console.log('현재 위치 확인용2', position.coords.latitude)

        this.setState({
          lat : position.coords.latitude,
          lon : position.coords.longitude
        })


        // 확인 완료
        // console.log('현재위치 확인용', this.state)


        // console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      // 현재 위치에 대한 옵션들
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );

  }

  
  render() {
    const lat = this.state.lat
    const lon = this.state.lon

    const REGION = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{marginLeft:10}}>
            {this.dateForm(this.props.todayTravel.dr_date)}, {this.timeForm(this.props.todayTravel.dr_time_spent)}
          </Text>

          <ModalDayFinish navigation={this.props.navigation}
           /> 
        </View>

        {/* 지도, 폴리라인, 마커, 추천여행지 this.props.todaytravel */}
        {/* 지도가 처음에 0 갔다가 뿅하고 이동함 */}
        <View
          style={{ flex:1 }}
        >

          <MapView
            region = {REGION}
            style={{height:200}}
          >
            {/* <Polyline
              coordinates={{"좌표"}}
              strokeColor='red'
              strokeWidth={1}
            ></Polyline>

            {
              this.props.todayTravel.map((marker, index) => (
                <Marker
                  coordinate={marker.tempPinList}
                  key={index}
                  title={marker.title}
                  onPress={()=> {}}
                />
              ))
            } */}

            {/* 추천 여행지 관련 마커
            {
              this.props
            } */}


          </MapView>
        </View>
        
        <Button title={"사진 모아보기"} onPress={this.allPictures}/>
        { this.state.clickPin
        ? <PinClickPage 
          selectedPin={this.state.selectedPin}
          selectPinFunc={this.selectPinFunc}/>
        : 
          <View>
            <Text style={styles.titleStyle}>
              {this.props.user_nickname}님은, "{this.props.travelingName}" 여행 중</Text>

            <Text style={styles.titleStyle}>{this.props.user_nickname}님이 방문한 장소 </Text>
            
            <PlaceList newSelectPinFunc={this.newSelectPinFunc} />
            <Text style={styles.titleStyle}>오늘의 지출</Text>
            <MoneyBook />
            <AddMoneyItem />
            <Text style={styles.titleStyle}>주변에 이런 곳이 있어요!</Text>
            <RecPlaceList />
          </View>
      }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  titleStyle: {
    fontSize: 20, marginLeft: 20, marginTop: 30,

  }
})


function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.usr_nickname,
    travelingName: state.accountRd.travelingName,
    travelStatus: state.accountRd.travelStatus,
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
    getCurrentInfo: (dr_id)=>{
      dispatch({
        type: "GET_CURRENT_INFO_ASYNC",
        payload: dr_id
      })
    },
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    },
    emptyList: () => {
      dispatch(ActionCreator.emptyList())
    },
    

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OnTravelMain) 