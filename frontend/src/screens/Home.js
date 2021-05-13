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
import { connect } from 'react-redux'

import ActionCreator from '.././store/actions'
import ModalStartTravel from '../components/modal/ModalStartTravel'
import { getRecordList as getRecordListAPI } from '../api/account'

import MainList from '../components/MainList'
import Maps_cluster from '../components/maps/Maps_cluster'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      mode: "map",
    }
  }

  startTravel = () => {
    this.props.navigation.navigate('OnTravelMain')
    this.props.changeStatus('onTravel')
    this.props.setDate()
  }

  continueTravel = () => {
    if ( this.props.travelStatus === "onTravel" || 
        this.props.travelStatus === "dayEndd" || 
        this.props.travelStatus === "travelEndd" ) {
      this.props.getCurrentInfo(this.props.dr_id)
      this.props.navigation.navigate('OnTravelMain')
    } else if ( this.props.travelStatus === "dayEnd" || this.props.travelStatus === "travelEnd" ) {
      this.props.navigation.navigate('EndTravelMain')
    } else {
      console.warn(this.props.travelStatus)
    }
  }

  selectPin = () => {
    this.props.navigation.navigate('TravelHistoryMain')
  }

  reduxTest = () => {
    this.props.navigation.navigate('Counter')
  }

  maps_cluster = () => {
    this.props.navigation.navigate('Maps_cluster')
  }

  current_location = () => {
    this.props.navigation.navigate('CurrentLocation')
  }

  test = () => {
    this.props.navigation.navigate('Test_Maps')
  }

  componentDidMount() {
    // console.log("componentDidMount부분", JSON.stringify(this.props.traveledList, null, 2))
    this.props.getRecordListReq()
  }


  render() {

    return (
      <View style={styles.container}>
        { this.state.mode === "map" ? 
          <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop: 40}}>
            <Maps_cluster />
          </View> :
          <MainList navigation={this.props.navigation}/> 
        }

        { this.state.mode === "map" ? 
          <View style={{position: 'absolute', right:0, bottom:0}}>
            {
            this.props.travelStatus === "rest"
            ? <ModalStartTravel navigation={this.props.navigation} /> 
            : <Button title={"여행이어서하기"} onPress={this.continueTravel}/>
            }
          </View> :
          null  
        }

        <View style={{position: 'absolute', flexDirection: "row", top: 0, backgroundColor: 'grey'}}>
          <TouchableOpacity
            disabled={this.state.mode=== "map" ? true: false}
            style={[styles.segmentBtn, { marginLeft : 3},this.state.mode === "map" ? {backgroundColor: 'skyblue'} : null]}
            onPress={() => this.setState({mode: "map"})}>
            <Text style={styles.segmentBtnText}>지도</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          disabled={this.state.mode=== "list" ? true: false}
            style={[styles.segmentBtn, { marginRight : 3},this.state.mode === "list" ? {backgroundColor: 'skyblue'} : null]} 
            onPress={() => this.setState({mode: "list"})}>
            <Text style={styles.segmentBtnText}>리스트</Text>
          </TouchableOpacity>
          
        </View>

        <View style={{position: 'absolute', left: 0, bottom: 0}}>
          <Button title={"지도에서 핀 누르기"} onPress={this.selectPin}/>
          <Button title={"REDUX TEST"} onPress={this.reduxTest}/>
          {/* <Button title={"maps_cluster"} onPress={this.maps_cluster}/> */}
          <Button title={"current_location"} onPress={this.current_location}/>
          <Button title={"test"} onPress={this.test}/>
        </View>
        
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  segmentBtn: {
    flex: 0.5,
    height: 30,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  segmentBtnText: {
    fontSize: 20,
  }

})


function mapStateToProps(state){
  // console.log("홈이당", state.accountRd)
  return {
    isLogin: state.accountRd.isLogin,
    travelStatus: state.accountRd.travelStatus,
    traveledList: state.accountRd.traveledList,
    dr_id: state.accountRd.todayTravel.dr_id
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
    setDate: () => {
      dispatch(ActionCreator.setDate())
    },
    getRecordListReq: () => {
      dispatch({
        type: 'GET_RECORD_LIST_ASYNC'
      })
    }
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)