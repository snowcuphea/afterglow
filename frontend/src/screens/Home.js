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

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  startTravel = () => {
    this.props.navigation.navigate('OnTravelMain')
    this.props.changeStatus('onTravel')
  }

  selectPin = () => {
    this.props.navigation.navigate('TravelHistoryMain')
  }

  reduxTest = () => {
    this.props.navigation.navigate('Counter')
  }


  render() {

    
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          지도가 보여지는 홈화면
        </Text>
        <Button title={"여행하기"} onPress={this.startTravel}/>
        <Button title={"지도에서 핀 누르기"} onPress={this.selectPin}/>
        <Button title={"REDUX TEST"} onPress={this.reduxTest}/>
        
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
    isLogin: state.accountRd.isLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatus: (status) => {
      dispatch(ActionCreator.changeStatus(status))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)