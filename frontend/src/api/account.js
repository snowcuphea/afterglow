import { createInstance } from "./index.js"

const instance = createInstance()


function login( success, fail) {

  instance
    .get("customLogin")
    .then(success)
    .catch(fail)

}

export { login }