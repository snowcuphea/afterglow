import types from '../actions/types'

const initialState = {
  pictures : [],
};

export default (state = initialState, action) => {

  switch ( action.type ) {
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
    // case types.SAVE_PICTURES:
    //   return {
    //     ...state,
    //     isLogin: true
    //   }
    default:
      return state;
  }
}