import {createSwitchNavigator, createStackNavigator} from 'react-navigation';
import {AppNavigator} from "./MainNavigators";
import Login from "../screens/Login";
import AuthLoadingScreen from "../components/container/AuthenticationLoading";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
});

export default createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);