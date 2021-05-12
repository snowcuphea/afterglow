import ActionCreator from '../actions'

import { takeLatest, put } from 'redux-saga/effects';
import { getRecordList, login } from '../../api/account'


export function* loginAsync() {
  login(
    (res) => {
      console.log("로그인응답", res.status)
      console.log(res.data)
      console.log("사가로 왔어")
      put(ActionCreator.login())
    },
    (err) => {
      console.log("로그인에러", err)
    }
  )
}

export function* getRecordListAsync() {
  console.log("getRecordListAsync사가입장")
  getRecordList(
    (res) => {
      console.log("사가에서 레코드status", res.status)
      console.log("사가에서 레코드받은데이터", res.data)
      put(ActionCreator.getRecordList(res.data))
    },
    (err) => {
      console.log("getRecordListAsync에러", err)
    }
  )
}

export const accountSagas = [
  takeLatest('LOGIN_ASYNC', loginAsync),
  takeLatest('GET_RECORD_LIST_ASYNC', getRecordListAsync),
]