import AppStackNavigator from '../routes/AppRouteConfig';
import {NavigationActions} from "react-navigation";
// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppStackNavigator.router.getActionForPathAndParams('Auth');
const tempNavState = AppStackNavigator.router.getStateForAction(firstAction);
const secondAction = AppStackNavigator.router.getActionForPathAndParams('Auth');
const initialNavState = AppStackNavigator.router.getStateForAction(
    secondAction,
    tempNavState
);

function NavigationReducer(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'Login':
            nextState = AppStackNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case 'Logout':
            nextState = AppStackNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Auth'}),
                state
            );
            break;
        default:
            nextState = AppStackNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

const initialAuthState = {isLoggedIn: false};

function AuthenticationReducer(state = initialAuthState, action) {
    switch (action.type) {
        case 'Login':
            return {...state, isLoggedIn: true};
        case 'Logout':
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}

export {NavigationReducer, AuthenticationReducer};