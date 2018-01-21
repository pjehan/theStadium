import React from 'react';
import {Component} from 'react';
import {StackNavigator, TabNavigator,addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import {Button, Text} from 'react-native';
//import { Icon } from 'react-native-elements';

import Login from '../../screens/Login';
import Loading from '../../screens/Loading';

import  Menu from '../../components/Main/Menu'
/** SIGN IN**/
import SignIn from '../../screens/SignIn/SignIn';
import UserBasic from '../../screens/SignIn/UserBasic'
import Header from '../../layout/Header.js';
import UserInfos from '../../screens/SignIn/UserInfos';
import PlayerClub from '../../screens/SignIn/Player/PlayerClub';
/** Tab **/
import PlayerSignInTabView from '../../screens/SignIn/Player/PlayerSignInTabView';
import MainTabView from '../../components/Main/TabBar'

const SignInTabBar = {
        tabBarComponent: ({navigation}) => <PlayerSignInTabView navigation={navigation}/>,
        tabBarVisible: false,
        tabBarPosition: 'bottom'
      };
const MAINTABBAR = {
    tabBarComponent: ({navigation}) => <MainTabView navigation={navigation}/>,
    tabBarVisible: false,
    tabBarPosition: 'bottom'
};
/** TimeLine **/
import TimeLine from '../../screens/TimeLine';

const MainStack = TabNavigator({
    TimeLine: {
        screen: TimeLine,
        navigationOptions: ({navigation}) => ({
            header: props => <Header headerType="text" backIcon={false} {...props} />,
        }),
        icon: 'theStadium/app/assets/img/picto/tabbar/timeline.png',
        iconOn: 'theStadium/app/assets/img/picto/tabbar/timeline-on.png'
    },
    Rechercher: {
        screen: TimeLine,
        icon: 'theStadium/app/assets/img/picto/tabbar/search.png',
        iconOn: 'theStadium/app/assets/img/picto/tabbar/search-on.png'
    },
    Notifications: {
        screen: TimeLine,
        icon: 'theStadium/app/assets/img/picto/tabbar/notification.png',
        iconOn: 'theStadium/app/assets/img/picto/tabbar/notification-on.png'
    },
    Menu: {
        screen: Menu,
        icon: 'theStadium/app/assets/img/picto/tabbar/menu.png',
        iconOn: 'theStadium/app/assets/img/picto/tabbar/menu-on.png'
    }
},MAINTABBAR)
const PlayerSignInStack = TabNavigator({
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

const FanSignInStack = TabNavigator({
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
  SignInTabBar);

  const CoachSignInStack = TabNavigator({
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
    SignInTabBar);

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
                header: props => <Header headerType="logo" backIcon={true} {...props} />
            })
        },
        PlayerSignIn: {
            screen: PlayerSignInStack,
            navigationOptions: ({navigation}) => ({
                header: props => <Header headerType="logo" backIcon={true} {...props} />,
                tabBarComponent: ({navigation}) => <TXTabBar navigation={navigation}/>,
                tabBarVisible: false,


            }),
        },
        FanSignIn: {
          screen: FanSignInStack,
          navigationOptions: ({navigation}) => ({
              header: props => <Header headerType="logo" backIcon={true} {...props} />,
              tabBarComponent: ({navigation}) => <TXTabBar navigation={navigation}/>,
              tabBarVisible: false,

          }),
        },
        CoachSignIn: {
          screen: CoachSignInStack,
          navigationOptions: ({navigation}) => ({
              header: props => <Header headerType="logo" backIcon={true} {...props} />,
              tabBarComponent: ({navigation}) => <TXTabBar navigation={navigation}/>,
              tabBarVisible: false,

          }),
        },
        Main: {
            screen: MainStack,
        }
    },
    {
        initialRouteName: "Main",
        headerMode: "screen"
    });
class AppNavigation extends Component {
    render() {
        const { navigationState, dispatch } = this.props;
        return (
            <Navigator
                navigation={addNavigationHelpers({ dispatch, state: navigationState })}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        navigationState: state.NavigationReducer
    };
};
export default connect(mapStateToProps)(AppNavigation);