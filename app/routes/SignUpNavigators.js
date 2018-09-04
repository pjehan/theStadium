import {createStackNavigator, createSwitchNavigator, createTabNavigator} from "react-navigation";
import UserBasic from "../screens/SignIn/UserBasic";
import UserInfos from "../screens/SignIn/UserInfos";
import PlayerClub from "../screens/SignIn/Player/PlayerClub";
import Header from "../components/presentational/layout/Header";
import Sexe from "../screens/SignIn/Sexe";
import SignUp from "../screens/SignIn/SignIn";
import React from "react";
import SignUpTabView from "../components/container/tabbars/SignUpTabView";


export const PlayerSignUpStack = createTabNavigator({
        Player: {
            screen: UserBasic,
        },
        PlayerInfosfrom: {
            screen: UserInfos,
        },
        PlayerClub: {
            screen: PlayerClub
        }
    },
    {
        tabBarComponent: ({navigation, ...options}) => {
            return (
                <SignUpTabView navigation={navigation} {...options} />
            )
        },
        tabBarPosition: 'bottom',
    }
);

export const UserTypeSwitch = createSwitchNavigator({
    Player: {
        screen: PlayerSignUpStack
    }
});

export const SignUpStack = createStackNavigator({
    Sexe: {
        screen: Sexe,
        navigationOptions: {
            header: null,
        }
    },
    SignUpUserType: {
        screen: SignUp,
        navigationOptions: {
            header: null,
        }
    },
    UserRegistering: {
        screen: UserTypeSwitch,
        navigationOptions: {
            header: null,
        }
    },

}, {
    initialRouteName: 'Sexe'
});
