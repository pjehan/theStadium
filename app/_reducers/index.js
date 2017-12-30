import {registration} from './register';
import {postList} from './post'
import { combineReducers } from 'redux';
const appReducer = combineReducers({
    registration,
    postList
});

export default appReducer;