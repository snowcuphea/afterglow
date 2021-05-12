import types from '../actions/types'
import ActionCreator from '../actions'

import { takeLatest, put } from 'redux-saga/effects';

export function* increaseCounterAsync(action) {
  try {

    console.log("여기통과")

    yield put(ActionCreator.countUp(action.payload));
  }
  catch (error) {
    console.log(error);
  }
}

export function* decreaseCounterAsync(action) {
  try {
    console.log("여기도 통과")
    yield put(ActionCreator.countDown(action.payload));
  }
  catch (error) {
    console.log(error);
  }
}

export const countSagas = [
  takeLatest('COUNT_UP_ASYNC', increaseCounterAsync),
  takeLatest('COUNT_DOWN_ASYNC', decreaseCounterAsync),
]