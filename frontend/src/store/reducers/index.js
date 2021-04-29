import { combineReducers } from 'redux'

import countReducer from './countReducer'

export default combineReducers({
  countRe: countReducer,
})

// const rootReducer = combineReducers({
//   count: countReducer
// })

// export default rootReducer