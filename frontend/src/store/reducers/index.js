import { combineReducers } from 'redux'

import countReducer from './countReducer'
import accountReducer from './accountReducer'

export default combineReducers({
  countRd: countReducer,
  accountRd: accountReducer,
})

// const rootReducer = combineReducers({
//   count: countReducer
// })

// export default rootReducer