import types from '../actions/types'
import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  isLogin : false,    // 로그인 할 때 받아옴

  user : {            // 로그인 할 때 받아옴
    usr_nickname : '',
    usr_email : '',
    usr_profile_img: undefined,
  },


  // 로그인 할 때 + 앱 사용 중, 여행X : rest, 여행중 : onTravel, 하루끝 : dayEnd, 여행끝 : travelEnd, 기록저장 후 : rest로
  travelStatus: 'rest', 

  // 내가마친여행들(여행의 인덱스, 여행시작점 위도/경도/행정구역(시), 여행시작날짜/끝날짜, 여행제목, 여행대표사진)
  traveledList: [],   // 로그인 할 때 받아옴

  travelingId: undefined,
  travelingName: '',  // 여행 시작 전 작성
  travelingList : [], // 여행 중 작성(전체)
  todayTravel : {     // 여행 중 작성(하루)
    dr_id: undefined,
    dr_timespent : 0,      // 하루 총 여행 시간
    dr_start_time: '',
    dr_end_time: '',      
    routeRecs : [],  // 방문한 장소 { imgRecs:{imgHeight,imgWidth,img_id,ir_image}, rr_id,rr_latitude,rr_longitude,rr_memo,rr_name,rr_time }
    conRecs: [{ hour:11, min:40, what:'정직한돈', much:62000 }],    // 가계부 { cr_datetime,cr_id,cr_money,cr_name, }
    dr_date: 0,
    todaycoords : [],
    
  },
  visitedPlace: [], //하루에 해당하는 방문 리스트

  recoPlace : [], // 여행 중 내 위치 기반 받아옴

  historyIndex : 0,

};




export default (state = initialState, action) => {

  var today = []

  switch ( action.type ) {
    case types.LOGIN:
      return {
        ...state,
        isLogin: true,
        user : {
          usr_nickname: action.payload.usr_nickname,
          usr_email: action.payload.usr_email,
          usr_profile_img: action.payload.usr_profile_img,
        },
        travelStatus: action.payload.usr_traveling_state
      }
    case types.LOGOUT:
      return initialState
    case types.GET_RECORD_LIST:
      today = action.payload.length > 0 ? action.payload[action.payload.length-1].dayRecs[action.payload[action.payload.length-1].dayRecs.length-1] : null
      return {
        ...state,
        traveledList : action.payload,
        travelingName : action.payload.length > 0 ? action.payload[action.payload.length-1].rec_name: null,
        travelingId: action.payload.length > 0 ? action.payload[action.payload.length-1].rec_id: null,
        travelingList: action.payload.length > 0 ? action.payload[action.payload.length-1].dayRecs: [],
        todayTravel: today !== null ? today : { ...initialState.todayTravel }
      }
    case types.CHANGE_STATUS:
      return {
        ...state,
        travelStatus : action.payload
      }
    case types.SET_TRAVEL_NAME:
      today = action.payload.dayRecs[action.payload.dayRecs.length-1]
      return {
        ...state,
        travelingList: [],
        visitedPlace: [],
        travelingName: action.payload.rec_name,
        travelingId: action.payload.rec_id,
        todayTravel: today
      }
    case types.ADD_MONEY_ITEM:
      return {
        ...state,
        todayTravel: {...state.todayTravel, conRecs : [ ...state.todayTravel.conRecs, action.payload ] }

      }
    case types.START_DAY:
      return {
        ...state,
        todayTravel: action.payload
      }
    case types.END_DAY:
      return {
        ...state,
        travelingList: [...state.traveledList, action.payload],
        todayTravel: action.payload
      }
    case types.SELECT_INDEX:
      return {
        ...state,
        historyIndex: action.payload
      }
    case types.SEND_LOCATION:
      return {
        ...state,
        todayTravel: { ...state.todayTravel, todaycoords : [ ...state.todayTravel.todaycoords, { id: action.payload.rr_id, lat: action.payload.rr_latitude, lon: action.payload.rr_longitude}]}
        
      }
    case types.SAVE_VISIT_PLACE:
      return {
        ...state,
        visitedPlace: action.payload
      }
    default:
      return state;
  }
}