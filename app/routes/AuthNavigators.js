import React from 'react';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';
import {AppNavigator} from "./MainNavigators";
import Login from "../screens/Login";
import AuthLoadingScreen from "../components/container/AuthenticationLoading";
import Header from "../components/presentational/layout/Header";
import {SignUpStack} from "./SignUpNavigators";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    SignUp: {
        screen: SignUpStack,
        navigationOptions:{
            header: props => <Header headerType="logo" backIcon={true} {...props} />
        }
    }
});
export default AuthStack
