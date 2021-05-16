import { createInstance, createInstancePicture } from "./index.js"

const instance = createInstance()

const instancePicture = createInstancePicture()


function upload( pictures ) {

  instance.post("records/saveImg", pictures)
  // instancePicture.post("records/saveImg", pictures)

}

export { upload }

