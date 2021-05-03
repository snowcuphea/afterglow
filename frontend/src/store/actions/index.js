import * as countAction from './countAction'
import * as accountAction from './accountAction'
import * as pictureAction from './pictureActions'

const ActionCreators = Object.assign({},
  countAction, accountAction, pictureAction
);

export default ActionCreators