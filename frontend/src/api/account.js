import { createInstance } from "./index.js"

const instance = createInstance()


function getRecordList( success, fail ) {

    instance
      .get("/records/total")
      .then(success)
      .catch(fail)
  }
  

function login( success, fail) {

  instance
    .get("customLogin")
    .then(success)
    .catch(fail)

}

export { login, getRecordList }
