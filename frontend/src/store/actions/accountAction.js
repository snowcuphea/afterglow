import types from './types'

export function login(){
  return {
    type: types.LOGIN,
    
  };
}

export function changeStatus(status){
  return {
    type: types.CHANGE_STATUS,
    payload: status
  }
}
