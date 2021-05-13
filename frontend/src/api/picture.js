import { createInstance, createInstancePicture } from "./index.js"

const instance = createInstance()

const instancePicture = createInstancePicture()


function upload( pictures, success, fail) {

  instancePicture
    .post("records/route/name", pictures)
    .then(success)
    .catch(fail)

}

export { upload }

