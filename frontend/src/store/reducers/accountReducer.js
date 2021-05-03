import types from '../actions/types'
import { Platform } from 'react-native';

const initialState = {
  isLogin : false,
  user_nickname: '',
};

export default (state = initialState, action) => {


  switch ( action.type ) {
    case types.LOGIN:
      return {
        ...state,
        isLogin: true,
        user_nickname: Platform.Version
      }
      
    default:
      return state;
  }
}