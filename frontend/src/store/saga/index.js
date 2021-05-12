import { all } from 'redux-saga/effects'
import { countSagas } from './countSaga'

export default function* rootSaga() {
  yield all([...countSagas])
}