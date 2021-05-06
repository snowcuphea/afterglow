import types from '../actions/types'

const initialState = {
  mode: 'look',
  pictures : [],
  singlePicture : {},
};

export default (state = initialState, action) => {

  switch ( action.type ) {
    case types.INITIAL_PICTURE:
      return initialState
    case types.EMPTY_LIST:
      return {
        ...state,
        pictures : [],
      }
    case types.SELECT_PICTURE:
      return {
        ...state,
        pictures: [ ...state.pictures, action.payload ]
      }
    case types.UNSELECT_PICTURE:
      return {
        ...state,
        pictures: state.pictures.filter((item) => item.id != action.payload)
      }
    case types.MODE_PICTURE:
      return {
        ...state,
        mode: action.payload
      }
    // case types.SAVE_PICTURES:
    //   return {
    //     ...state,
    //     isLogin: true
    //   }
    default:
      return state;
  }
}