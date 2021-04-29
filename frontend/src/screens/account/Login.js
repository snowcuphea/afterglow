import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { CommonActions } from '@react-navigation/native';

import ActionCreator from '../../store/actions'
import { connect } from 'react-redux'


class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
  }

  login = () => {
    this.props.login()
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}]
      })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>로그인 화면</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.login}>
          <Text style={styles.textStyle}>KAKAO 로그인</Text>
        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: 'yellow',
    padding: 10
  },
  textStyle: {
    color: 'brown',
  }

  
})



function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      dispatch(ActionCreator.login())
    }
  };
}

export default connect(mapDispatchToProps)(LoginScreen)