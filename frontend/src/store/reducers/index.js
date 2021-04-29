import { combineReducers } from 'redux'

import countReducer from './countReducer'

export default combineReducers({
  count: countReducer,
})

// const rootReducer = combineReducers({
//   count: countReducer
// })

// export default rootReducer