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
import ModalStartTravel from '../../components/modal/ModalStartTravel'

import { connect } from 'react-redux'
import ActionCreator from '../.././store/actions'



class OnTravelMain extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: '',
      passedTime: '',
    }
    console.log("OnTravelMain 생성자부분", this.props.todayTravel)
  }

  componentDidMount() {
    const timeStamp = this.props.todayTravel.todayDate;
    const startTime = new Date( timeStamp );
    console.log(startTime.getDate())
    const nowTime = new Date();
    const tempPassed = nowTime - startTime
    const hours = Math.floor(tempPassed/3600000)
    const mins = Math.floor((tempPassed%3600000)/60000)
    this.setState({
      startDate: startTime.getFullYear() + '년 ' + 
                + ('0'+(startTime.getMonth()+1)).slice(-2) + '월 '
                + ('0'+startTime.getDate()).slice(-2) + '일',
      passedTime: hours > 0 ? ( mins > 0 ? hours + '시간 ' + mins + '분' : hours+'시간') :
                              ( mins > 0 ? mins + '분' : '여행을 시작했습니다.' )
    })
  }

  endDay = () => {
    this.props.navigation.navigate('SavePictures');
    this.props.changeStatus('dayEndd');
    this.props.modePicture('save');
    this.props.emptyList();
  }

  endTravel = () => {
    this.props.navigation.navigate('SavePictures');
    this.props.changeStatus('travelEndd');
    this.props.modePicture('save');
    this.props.emptyList();
  }
q
  selectPin = () => {

  }

  allPictures = () => {
    this.props.navigation.navigate('ShowPictures');
    this.props.modePicture('look');
    this.props.emptyList();
  }

  
  render() {
    console.log("OnTravelMain render부분")
    
    return (
      <ScrollView style={styles.container}>
        <Text>
          {this.state.startDate}, {this.state.passedTime}
        </Text>
       
        <Button title={"하루 끝"} onPress={this.endDay}/>
        <Button title={"여행 끝"} onPress={this.endTravel}/>
        <Button title={"핀을 눌렀을 때"} onPress={this.selectPin}/>
        <Button title={"사진 모아보기"} onPress={this.allPictures}/>
        <Text style={styles.titleStyle}>
          {this.props.user_nickname}님은, "{this.props.travelingName}" 여행 중</Text>

        <Text style={styles.titleStyle}>{this.props.user_nickname}님이 방문한 장소 </Text>
        <PlaceList />
        <Text style={styles.titleStyle}>오늘의 지출</Text>
        <MoneyBook />
        {/* <AddMoneyItem /> */}
        <Text style={styles.titleStyle}>주변에 이런 곳이 있어요!</Text>
        <RecPlaceList />

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
    fontSize: 20, marginLeft: 20, marginTop: 30, fontFamily:'RIDIBatang'

  }
})


function mapStateToProps(state) {

  console.log("onTravel mapStateToProps부분", state.accountRd.todayTravel.todayDate)

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.nickname,
    travelingName: state.accountRd.travelingName,
    travelStatus: state.accountRd.travelStatus,
    todayTravel: state.accountRd.todayTravel,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch(ActionCreator.changeStatus(status))
    },
    modePicture: (mode) => {
      dispatch(ActionCreator.modePicture(mode))
    },
    emptyList: () => {
      dispatch(ActionCreator.emptyList())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OnTravelMain) 