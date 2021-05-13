import types from './types'

export function login(userData){
  return {
    type: types.LOGIN,
    payload: userData
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  }
}

export function getRecordList(recordList) {
  // console.log("asdfasdf", recordList)
  return {
    type: types.GET_RECORD_LIST,
    payload: recordList
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

export function setTravelName(data) {
  return {
    type: types.SET_TRAVEL_NAME,
    payload: data
  }
}

export function addMoneyItem(moneyItem) {
  return {
    type: types.ADD_MONEY_ITEM,
    payload: moneyItem
  }
}