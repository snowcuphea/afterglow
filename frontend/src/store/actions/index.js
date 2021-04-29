import * as countAction from './countAction'
import * as accountAction from './accountAction'

const ActionCreators = Object.assign({},
  countAction, accountAction
);

export default ActionCreators