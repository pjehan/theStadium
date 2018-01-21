import {registeringUser} from './register';
import {postList} from './post'
import NavigationReducer from './navigation'
import { combineReducers } from 'redux';


const appReducer = combineReducers({
    registeringUser,
    postList,
    NavigationReducer,
});


export default appReducer;