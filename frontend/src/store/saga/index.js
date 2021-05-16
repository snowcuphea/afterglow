import { all } from 'redux-saga/effects'
import { countSagas } from './countSagas'
import { accountSagas } from './accountSagas'
import { pictureSagas } from './pictureSagas'

export default function* rootSaga() {
  yield all([...countSagas, ...accountSagas, ...pictureSagas])
}