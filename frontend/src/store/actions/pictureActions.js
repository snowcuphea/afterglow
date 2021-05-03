import types from './types'

export function selectPicture(picture){
    return {
      type: types.SELECT_PICTURE,
      payload: picture
    };
  }

export function unselectPicture(picture_id) {
  return {
    type: types.UNSELECT_PICTURE,
    payload: picture_id
  }
}

export function savePictures() {
  return {
    type: types.SAVE_PICTURES
  }
}
