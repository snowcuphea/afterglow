import ActionCreator from '../actions'

import { takeLatest, put } from 'redux-saga/effects';
import { login } from '../../api/account'


export function* savePictureAsync() {
  
}

export const pictureSagas = [
  takeLatest('LOGIN_ASYNC', loginAsync),
]