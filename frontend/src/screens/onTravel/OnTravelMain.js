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

import { connect } from 'react-redux'
import ActionCreator from '../.././store/actions'


class OnTravelMain extends React.Component {

  constructor (props) {
    super(props)
  }

  endDay = () => {
    this.props.navigation.navigate('SelectPicture')
    this.props.changeStatus('dayEnd')
  }

  endTravel = () => {
    this.props.navigation.navigate('SelectPicture')
    this.props.changeStatus('travelEnd')
  }

  selectPin = () => {

  }

  allPictures = () => {
    this.props.navigation.navigate('OnTravelAllPictures')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>
          여행 중 화면
        </Text>
        <Button title={"하루 끝"} onPress={this.endDay}/>
        <Button title={"여행 끝"} onPress={this.endTravel}/>
        <Button title={"핀을 눌렀을 때"} onPress={this.selectPin}/>
        <Button title={"사진 모아보기"} onPress={this.allPictures}/>
        <Text style={styles.titleStyle}>
          {this.props.user_nickname}님은, ____ 여행 중</Text>

        <Text style={styles.titleStyle}>{this.props.user_nickname}님이 방문한 장소 </Text>
        <Text style={styles.titleStyle}>가계부</Text>
        <MoneyBook />
        {/* <AddMoneyItem /> */}
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
    fontSize: 20, marginLeft: 20, marginTop: 20, fontFamily:'RIDIBatang'

  }
})


function mapStateToProps(state) {

  return {
    isLogin: state.accountRd.isLogin,
    user_nickname: state.accountRd.user.nickname
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch(ActionCreator.changeStatus(status))
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OnTravelMain) 