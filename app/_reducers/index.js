import {registeringUser} from './register';
import {postList} from './post'
import { combineReducers } from 'redux';
const appReducer = combineReducers({
    registeringUser,
    postList
});

export default appReducer;