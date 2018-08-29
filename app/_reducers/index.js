import {registeringUser} from './register';
import {postList,commentList,ownerList} from './post'
import {NavigationReducer, AuthenticationReducer} from './navigation'
import { combineReducers } from 'redux';
import {currentUser,inspectedUser,searchList} from "./user";
import {clubList} from "./club";


const AppReducer = combineReducers({
    registeringUser,
    inspectedUser,
    postList,
    ownerList,
    NavigationReducer,
    AuthenticationReducer,
    commentList,
    currentUser,
    clubList,
    searchList

});


export default AppReducer;