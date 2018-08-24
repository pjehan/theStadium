import {Navigator} from '../config/router/router';
const initialState = Navigator.router.getStateForAction(
    Navigator.router.getActionForPathAndParams("Login")
);
const NavigationReducer = (state = initialState, action) => {
    console.log(state, action);
    const newState = Navigator.router.getStateForAction(action,state);
    return newState || state;
};

export default NavigationReducer;