import {userActions} from './user';
import {postActions} from './post';
import {teamActions} from './team';
const ActionCreators = Object.assign({},
    postActions, userActions, teamActions);

export default ActionCreators;