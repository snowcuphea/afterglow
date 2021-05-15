import { createInstance } from "./index.js"

const instance = createInstance()


function getRecordList() {
    return instance.get("records/total")
  }
  

function login() {

  return instance.get("customLogin")

}

function startTrip( title ) {

  const titleForm = {
    'title': title
  }

  return instance.post("records/startTrip",{},{ params: titleForm})
}

function startDay( rec_id ) {

  const recForm = {
    "recId" : rec_id
  }

  return instance.post("records/startDay",{},{ params: recForm})
}

function endDay(dr_id) {
  console.log("axios endDay", dr_id)
  return instance.get(`records/dayEnd?drId=${dr_id}`)
  
}

function changeStatus( status ) {
  const statusForm = {
    'status': status
  }

  return instance.post("change/travelingState", {}, { params: statusForm})

}

function getTripInfo( rec_id ) {

  const recForm = {
    "Record_id" : rec_id
  }

  console.log("여행정보받아오기 axios", recForm)

  return instance.get("records/tripinfo", { params : recForm })

}

function getCurrentInfo( dr_id ) {

  return instance.get(`records/current?drId=${dr_id}`)

}

function sendLocationInfo( data ) {

  return instance.post("records/route", {}, { params: data })
}

function saveMemo( data ) {
  return instance.post("records/memo/create", {}, { params: data })
}

export { login, getRecordList, startTrip, changeStatus, getTripInfo, startDay, endDay, getCurrentInfo, sendLocationInfo,
  saveMemo }
