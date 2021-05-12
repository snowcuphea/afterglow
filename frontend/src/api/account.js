import { createInstance } from "./index.js"

const instance = createInstance()


function getRecordList( success, fail ) {

    // instance.defaults.headers['Authorization'] = "jwt " + window.localStorage.getItem('jwt')

    instance
      .get("records/total")
      .then(success)
      .catch(fail)
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

export { login, getRecordList, startTrip }
