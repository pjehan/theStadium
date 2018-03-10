import {registeringUser} from './register';
import {postList,commentList} from './post'
import NavigationReducer from './navigation'
import { combineReducers } from 'redux';
import {currentUser} from "./user";


const appReducer = combineReducers({
    registeringUser,
    postList,
    NavigationReducer,
    commentList,
    currentUser,
});


export default appReducer;