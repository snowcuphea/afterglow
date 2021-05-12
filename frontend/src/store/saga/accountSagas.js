import ActionCreator from '../actions'

import { takeLatest, put, call } from 'redux-saga/effects';
import { login, startTrip } from '../../api/account'


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

export function* startTravelAsync(action) {
  try {

    const { status, data} = yield call(startTrip, action.payload)
    
    console.log("여행시작 응답", status)
    console.log("여행시작 데이터", data)

    yield put(ActionCreator.setTravelName(action.payload))

  } catch (error) {
    console.log(error)
  }
}

export function* changeStatusAsync(action) {
  try {
    yield put(ActionCreator.changeStatus(action.payload))
  } catch (error) {
    console.log(error)
  }
}


export const accountSagas = [
  takeLatest('LOGIN_ASYNC', loginAsync),
  takeLatest('SET_TRAVEL_NAME_ASYNC', startTravelAsync),
  takeLatest('CHANGE_STATUS_ASYNC', changeStatusAsync),
]