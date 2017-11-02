import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

import {Button, Text} from 'react-native';
//import { Icon } from 'react-native-elements';

import Login from '../../screens/Login';
import Loading from '../../screens/Loading';

/** SIGN IN**/
import SignIn from '../../screens/SignIn/SignIn';
import PlayerSignIn from '../../screens/SignIn/Player/Player'
import Header from '../../layout/Header.js';
import PlayerSignInTabView from '../../screens/SignIn/Player/PlayerSignInTabView';
import PlayerInfos from '../../screens/SignIn/Player/PlayerInfos';

export const PlayerSignInStack = TabNavigator({
        Player: {
            screen: PlayerSignIn,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />,

            })
        },
        PlayerInfosfrom: {
            screen: PlayerInfos,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />,

            })
        }
    },
    {
        tabBarComponent: ({navigation}) => <PlayerSignInTabView navigation={navigation}/>,
        tabBarVisible: false,
        tabBarPosition: 'bottom'
    });
export const Navigator = StackNavigator({
        Loading: {
            screen: Loading,
            navigationOptions: {
                header: null,
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
        SignIn: {
            screen: SignIn,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />
            })
        },
        PlayerSignIn: {
            screen: PlayerSignInStack,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />,
                tabBarComponent: ({navigation}) => <TXTabBar navigation={navigation}/>,
                tabBarVisible: false,

            }),
        }
    },
    {
        initialRouteName: "Loading",
        headerMode: "screen"
    });
