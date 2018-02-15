import {registeringUser} from './register';
import {postList,commentList} from './post'
import NavigationReducer from './navigation'
import { combineReducers } from 'redux';


const appReducer = combineReducers({
    registeringUser,
    postList,
    NavigationReducer,
    commentList,
});


export default appReducer;