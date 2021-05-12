import ActionCreator from '../actions'

import { takeLatest, put } from 'redux-saga/effects';
import { login } from '../../api/account'


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

export const accountSagas = [
  takeLatest('LOGIN_ASYNC', loginAsync),
]