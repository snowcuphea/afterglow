import types from '../actions/types'

const initialState = {
  count : 0,
};

export default (state = initialState, action) => {
  switch ( action.type ) {
    case types.COUNT_UP:
      return {
        ...state,
        count: state.count + action.payload
      }
    case types.COUNT_DOWN:
      return {
        ...state,
        count: state.count - action.payload
      }
      default:
        return state;
  }
}