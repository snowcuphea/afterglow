import { createInstance, createInstancePicture } from "./index.js"

const instance = createInstance()

const instancePicture = createInstancePicture()


function upload( pictures ) {

  console.log("요청은 옴", JSON.stringify(pictures,null,2))
  // instance.post(`records/save/image?rr_id=${pictures.rr_id}`, pictures.pictures)
  instancePicture.post(`records/save/image?rr_id=${pictures.rr_id}`, pictures.picture)
  // instancePicture.post(`records/save/images?rr_id_list=${pictures.rr_id}`, pictures.pictures)

}

export { upload }

