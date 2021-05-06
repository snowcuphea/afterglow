import types from '../actions/types'
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  isLogin : false,    // 로그인 할 때 받아옴

  user : {            // 로그인 할 때 받아옴
    nickname : '',
    email : ''
  },


  // 로그인 할 때 + 앱 사용 중, 여행X : rest, 여행중 : onTravel, 하루끝 : dayEnd, 여행끝나면 다시 : rest
  travelStatus: 'rest', 

  // 내가마친여행들(여행의 인덱스, 여행시작점 위도/경도/행정구역(시), 여행시작날짜/끝날짜, 여행제목, 여행대표사진)
  traveledList: [],   // 로그인 할 때 받아옴

  travelingName: '',  // 여행 시작 전 작성
  travelingList : [], // 여행 중 작성(전체)
  todayTravel : {     // 여행 중 작성(하루)
    timespent : 0,      // 하루 총 여행 시간
    todayDate: '',      
    visitedPlace : [],  // 방문한 장소 { name: "해변", time: "", location: { lat: 30, lon: 30}, memo : "" }
    moneyBook: [],    // 가계부 { name: "돼지고기", time: "", price: 35000 }
    track: [],
    pictures: [],
  },

  recoPlace : [], // 여행 중 내 위치 기반 받아옴


};

export default (state = initialState, action) => {


  switch ( action.type ) {
    case types.LOGIN:
      return {
        ...state,
        isLogin: true,
        user : { ...state.user, nickname: Platform.Version }
      }
    case types.LOGOUT:
      return initialState
    case types.CHANGE_STATUS:
      return {
        ...state,
        travelStatus : action.payload
      }
    case types.SET_DATE:
      return {
        ...state,
        todayTravel: {
          ...state.todayTravel,
          todayDate: new Date().getTime()    // 여행/하루를 시작하는 timestamp(ms 단위) 설정
        }
      }
    default:
      return state;
  }
}