import ActionCreator from '../actions'

import { takeLatest, put, call } from 'redux-saga/effects';
import { upload } from '../../api/picture'

import base64 from "react-native-base64"

export function* savePictureAsync(action) {
  try {

    const body = []
    for ( var picture of action.payload) {
      const encode = base64.encode(picture.uri)
      const pictureForm = {
        'rr_id': picture.rr_id,
        'height': picture.imageSize.height,
        'width': picture.imageSize.width,
        'irImage': encode
      }
      body.push(pictureForm)
    }
    console.log(JSON.stringify(body,null,2))
    const { status,data } = yield call(upload, body)
    console.log("사진 저장 응답", status, data)

    // yield put(ActionCreator.savePictures())

  } catch (error) {
    console.log("사진 저장 에러", error)
  }
}

export const pictureSagas = [
  takeLatest('SAVE_PICTURE_ASYNC', savePictureAsync),
]