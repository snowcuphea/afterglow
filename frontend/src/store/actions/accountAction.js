import types from './types'

export function login(){
  return {
    type: types.LOGIN,
    
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  }
}

export function changeStatus(status){
  return {
    type: types.CHANGE_STATUS,
    payload: status
  }
}

export function setDate() {
  return {
    type: types.SET_DATE
  }
}
