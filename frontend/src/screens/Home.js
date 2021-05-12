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
import { connect } from 'react-redux'

import ActionCreator from '.././store/actions'
import ModalStartTravel from '../components/modal/ModalStartTravel'

import MainList from '../components/MainList'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      mode: "map"
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


  render() {

    
    return (
      <View style={styles.container}>
        { this.state.mode === "map" ? 
          <View><Text>지도가보여지는 영역</Text></View> :
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

        <View style={{position: 'absolute', flexDirection: "row", justifyContent: 'center', top: 0}}>
          <Button title={"지도"} onPress={() => this.setState({mode: "map"})}/>
          <Button title={"리스트"} onPress={() => this.setState({mode: "list"})}/>
        </View>

        <View style={{position: 'absolute', left: 0, bottom: 0}}>
          <Button title={"지도에서 핀 누르기"} onPress={this.selectPin}/>
          <Button title={"REDUX TEST"} onPress={this.reduxTest}/>
          <Button title={"maps_cluster"} onPress={this.maps_cluster}/>
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
  textStyle: {
    fontFamily: 'RIDIBatang',
  }

})


function mapStateToProps(state){

  return {
    isLogin: state.accountRd.isLogin,
    travelStatus: state.accountRd.travelStatus
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
    setDate: () => {
      dispatch(ActionCreator.setDate())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)