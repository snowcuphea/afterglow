import ActionCreator from '../actions'

import { takeLatest, put, call } from 'redux-saga/effects';
import { login, startTrip, getRecordList, changeStatus, getTripInfo, startDay, endDay, 
          getCurrentInfo, sendLocationInfo, saveMemo } from '../../api/account'


export function* loginAsync() {
  try {
    const { status, data } = yield call(login)
    console.log("로그인응답", status)
    console.log("로그인데이터", data)
    yield put(ActionCreator.login(data))

  } catch (error) {
    console.log(error)
  }
}

export function* getRecordListAsync() {
  try {
    const res = yield call(getRecordList)
    // console.log("여행리스트응답코드", res.status)
    // console.log("여행리스트데이터", res.data)
    yield put(ActionCreator.getRecordList(res.data))

  } catch (error) {
    console.log(error)
  }
}

export function* startTravelAsync(action) {
  try {

    const { status, data } = yield call(startTrip, action.payload)

    console.log("여행시작 응답", status)
    console.log("여행시작 데이터", data)

    yield put(ActionCreator.setTravelName(data))

  } catch (error) {
    console.log(error)
  }
}

export function* changeStatusAsync(action) {
  try {
    const { status,data } = yield call(changeStatus, action.payload)

    yield put(ActionCreator.changeStatus(action.payload))
  } catch (error) {
    console.log(error)
  }
}

export function* endDayAsync(action) {
  try{
    const { status, data } = yield call(endDay, action.payload) 
    console.log( "하루가 끝나고 ",  status, data )

    yield put(ActionCreator.endDay(data))

  } catch (error) {
    console.log("하루가 끝나는", error)
  }
}

export function* startDayAsync(action) {
  try{
    const { status, data } = yield call(startDay, action.payload) 
    console.log( "하루가 시작 ",  status, data )

    yield put(ActionCreator.startDay(data))

  } catch (error) {
    console.log("하루가 시작하는", error)
  }
}

export function* getCurrentInfoAsync(action) {
  try{
    const { status, data } = yield call(getCurrentInfo, action.payload) 
    // console.log( "getCurrentInfoAsync의 여행중 현재 상태\n",  status, JSON.stringify(data, null, 2) )

    yield put(ActionCreator.startDay(data))

  } catch (error) {
    console.log("getCurrentInfoAsync의 여행중 현재 상태", error)
  }
}

export function* sendLocationInfoAsync(action) {
  try{
    const { status, data } = yield call(sendLocationInfo, action.payload) 
    console.log( "위치 성공",  status, data )

    yield put(ActionCreator.sendLocationInfo(data))

  } catch (error) {
    console.log("위치 에러", error)
  }
}

export function* saveMemoAsync(action) {
  try{
    const { status, data } = yield call( saveMemo, action.payload ) 
    console.log("메모저장성공",  status, data )

    yield put(ActionCreator.updateMemo(data))

  } catch (error) {
    console.log("메모저장에러", error)
  }
}


export const accountSagas = [
  takeLatest('LOGIN_ASYNC', loginAsync),
  takeLatest('GET_RECORD_LIST_ASYNC', getRecordListAsync),
  takeLatest('SET_TRAVEL_NAME_ASYNC', startTravelAsync),
  takeLatest('CHANGE_STATUS_ASYNC', changeStatusAsync),
  takeLatest('END_DAY_ASYNC', endDayAsync),
  takeLatest('START_DAY_ASYNC', startDayAsync),
  takeLatest('GET_CURRENT_INFO_ASYNC', getCurrentInfoAsync),
  takeLatest('SEND_LOCATION_INFO_ASYNC', sendLocationInfoAsync),
  takeLatest('SAVE_MEMO_ASYNC', saveMemoAsync),
]