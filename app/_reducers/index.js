import {registeringUser} from './register';
import {postList,commentList,ownerList} from './post'
import NavigationReducer from './navigation'
import { combineReducers } from 'redux';
import {currentUser,inspectedUser} from "./user";


const appReducer = combineReducers({
    registeringUser,
    inspectedUser,
    postList,
    ownerList,
    NavigationReducer,
    commentList,
    currentUser,

});


export default appReducer;