import ActionCreator from '../actions'

import { takeLatest, put, call } from 'redux-saga/effects';
import { upload } from '../../api/picture'

import base64 from "react-native-base64"

export function* savePictureAsync(action) {
  try {

    const formBody = []
    const rr_id_body = []
    for ( var picture of action.payload) {
      // const encode = base64.encode(picture.uri)
      // const pictureForm = {
      //   'rr_id': picture.rr_id,
      //   'height': picture.imageSize.height,
      //   'width': picture.imageSize.width,
      //   'irImage': encode
      // }
      // body.push(pictureForm)

      //2.
      // const pictureForm = {
      //   'imageFile': picture,
      //   'type': picture.type
      // }
      // rr_id_body.push(picture.rr_id)
      // formBody.push(pictureForm)


      // 3.
      // console.log(picture)
      const form = new FormData()
      const name = picture.filename;
      const [, type] = name.split(".");
      form.append('file',{
        name,
        type: picture.type, 
        uri: picture.uri
      })
      const { status,data } = yield call(upload, { rr_id: picture.rr_id, picture: form})
    }

    
    // const formdata = new FormData()
    // formdata.append('file', formBody)
    
    // const body = {
    //   rr_id : rr_id_body,
    //   pictures : formdata
    // }
    // console.log(JSON.stringify(body,null,2))

    
    console.log("사진 저장 응답", status, data)

    // yield put(ActionCreator.savePictures())

  } catch (error) {
    console.log("사진 저장 에러", error)
  }
}

export const pictureSagas = [
  takeLatest('SAVE_PICTURE_ASYNC', savePictureAsync),
]