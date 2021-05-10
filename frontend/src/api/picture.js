import { createInstance, createInstancePicture } from "./index.js"

const instance = createInstance()

const instancePicture = createInstancePicture()


function upload( pictures, success, fail) {

  instancePicture
    .post("나머지 url", pictures)
    .then(success)
    .catch(fail)

}

export { upload }


// getLessonInfo(
//   itemId,
//   (res) => {
//     // console.log("getLessonInfoByItem뮤테이션",res.data)
//     commit('GETLESSONINFO', res.data)

//   },
//   (err) => {
//     console.log("asdfsadfsdad,ItemId", itemId)
//     console.log("getLessonInfoByItem뮤테이션에러", err)

//   }
// )