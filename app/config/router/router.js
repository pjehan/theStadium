import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

import {Button, Text} from 'react-native';
//import { Icon } from 'react-native-elements';

import Login from '../../screens/Login';
import Loading from '../../screens/Loading';

/** SIGN IN**/
import SignIn from '../../screens/SignIn/SignIn';
import UserBasic from '../../screens/SignIn/UserBasic'
import Header from '../../layout/Header.js';
import PlayerSignInTabView from '../../screens/SignIn/Player/PlayerSignInTabView';
import UserInfos from '../../screens/SignIn/UserInfos';
import PlayerClub from '../../screens/SignIn/Player/PlayerClub';
const SignInTabBar = {
        tabBarComponent: ({navigation}) => <PlayerSignInTabView navigation={navigation}/>,
        tabBarVisible: false,
        tabBarPosition: 'bottom'
      };

export const PlayerSignInStack = TabNavigator({
        Player: {
            screen: UserBasic,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />,

            })
        },
        PlayerInfosfrom: {
            screen: UserInfos,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />,

            })
        },
        PlayerClub: {
          screen: PlayerClub,
          navigationOption: ({navigation}) => ({
            header: props => <Header {...props} />
          })
        }
    },
    SignInTabBar);

export const FanSignInStack = TabNavigator({
  Fan: {
      screen: UserBasic,
      navigationOptions: ({navigation}) => ({
          header: props => <Header {...props} />,

      })
  },
  FanInfos: {
      screen: UserInfos,
      navigationOptions: ({navigation}) => ({
          header: props => <Header {...props} />,

      })
  },
},
  SignInTabBar)

  export const CoachSignInStack = TabNavigator({
    Coach: {
        screen: UserBasic,
        navigationOptions: ({navigation}) => ({
            header: props => <Header {...props} />,

        })
    },
    CoachInfos: {
        screen: UserInfos,
        navigationOptions: ({navigation}) => ({
            header: props => <Header {...props} />,

        })
    },
  },
    SignInTabBar)

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
        },
        FanSignIn: {
          screen: FanSignInStack,
          navigationOptions: ({navigation}) => ({
              header: props => <Header {...props} />,
              tabBarComponent: ({navigation}) => <TXTabBar navigation={navigation}/>,
              tabBarVisible: false,

          }),
        },
        CoachSignIn: {
          screen: CoachSignInStack,
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
