import { createInstance } from "./index.js"

const instance = createInstance()

function upload( data ) {

  instance.defaults.headers["Content-Type"] = "multipart/form-data"

  return instance.post(`records/save/image?rr_id=${data.rr_id}`, data.picture)

}

export { upload }

