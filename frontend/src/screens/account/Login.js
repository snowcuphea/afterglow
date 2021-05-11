import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import ActionCreator from '../../store/actions'
import { connect } from 'react-redux'

import { login as kakaoLogin } from '@react-native-seoul/kakao-login'

import { login } from '../.././api/account'

import CookieManager from '@react-native-cookies/cookies'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
  }

  signInWithKakao = async () => {
    await kakaoLogin()
    .then(res => {
      CookieManager.set('http://k4a105.p.ssafy.io:8080', {
        name: 'access_token',
        value: res.accessToken,
      }).then((done) => {
        console.log("access_token", done)
        CookieManager.set('http://k4a105.p.ssafy.io:8080', {
          name: 'refresh_token',
          value: res.refreshToken,
        }).then((done) => {
          console.log("refresh_token", done)
          login(
            (res) => {
              console.log("로그인응답", res)
              this.props.login()
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Home'}]
                })
              )
            },
            (err) => {
              console.log("로그인에러", err)
            }
          )
        })
      })

    }) .catch(err => 
      console.log("카카오로그인 에러", err)
    )

    // this.props.login()
    // this.props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [{name: 'Home'}]
    //   })
    // )
  };


  render() {

    console.log("Login.js", this.props.isLogin)

    return (
      <View style={styles.container}>
        <Text>로그인 화면</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.signInWithKakao()}>
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

function mapStateToProps(state) {
  return {
    isLogin: state.accountRd.isLogin
  };
}


function mapDispatchToProps(dispatch) {

  return {
    login: () => {
      dispatch(ActionCreator.login());
    },
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(LoginScreen)