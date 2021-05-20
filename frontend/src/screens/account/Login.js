import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

import { CommonActions } from '@react-navigation/native';

import ActionCreator from '../../store/actions'
import { connect } from 'react-redux'

import { login as kakaoLogin } from '@react-native-seoul/kakao-login'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { login } from '../.././api/account'

import CookieManager from '@react-native-cookies/cookies'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
  }

  signInWithKakao = async () => {
    await kakaoLogin()
    .then(res => {
      console.log(JSON.stringify(res, null, 2))
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
          this.props.login()
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}]
            })
          )
          this.props.getRecordListReq()
        })
      })

    }) .catch(err => 
      console.log("카카오로그인 에러", err)
    )
  };


  render() {

    console.log("Login.js", this.props.isLogin)

    return (
    

      <View style={{flex:1, paddingTop: 15}} >

        <View style={styles.titleContainer}>
        <Text style={styles.textStyle}>안녕하세요, </Text>
        <Text style={styles.textStyle}>여행의 여운을 선사할 "여운"입니다.</Text>
          
        </View>
      
      <View style={styles.container}>

      
        <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/pics/ag_logo.png')}/>
          <Text style={{fontSize:50, color:'#49C4D7', fontFamily:'RIDIBatang', fontWeight:'500'}}>여 운</Text>

        
      </View>

      <View style={styles.btncontainer}>

        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.signInWithKakao()}>
          <MaterialCommunityIcons name="chat" size={35} style={{marginRight:20}}/>
          <Text style={styles.logintextStyle}>카카오 로그인</Text>
        </TouchableOpacity>
        </View>


      </View>

    )
  }

}

const styles = StyleSheet.create({
  titleContainer:{
    // marginLeft:20,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    flex:5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btncontainer:{
    flex:5,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {

    backgroundColor: '#FEE500',
    padding: 10,
    height: 90,
    width:300,
    margin:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    

  },
  textStyle:{
    fontSize:20,
  },
  logintextStyle: {
    fontSize:30,
    color: 'black',
    fontFamily:'arial',
    // fontWeight:'bold'
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
      dispatch({
        type: 'LOGIN_ASYNC'
      });
    },
    getRecordListReq: () => {
      dispatch({
        type: 'GET_RECORD_LIST_ASYNC'
      })
    }
  };
}

export default connect( mapStateToProps, mapDispatchToProps )(LoginScreen)