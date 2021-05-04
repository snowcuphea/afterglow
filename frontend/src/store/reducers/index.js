import { combineReducers } from 'redux'

import countReducer from './countReducer'
import accountReducer from './accountReducer'
import pictureReducer from './pictureReducer'

export default combineReducers({
  countRd: countReducer,
  accountRd: accountReducer,
  pictureRd: pictureReducer,
})

// const rootReducer = combineReducers({
//   count: countReducer
// })

// export default rootReducer