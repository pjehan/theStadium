import React from 'react';
import {Component} from 'react';
import {Image} from 'react-native';
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


import Profil from '../../screens/Profil';
import ProfileTabBar from '../../components/Profil/profilTab';
import Actus from '../../screens/Actus'

const SignInTabBar = {
        tabBarComponent: ({navigation}) => <PlayerSignInTabView navigation={navigation}/>,
        tabBarVisible: false,
        tabBarPosition: 'bottom'
      };
const PROFILETAB = {
    tabBarComponent: ({navigation}) => <ProfileTabBar focused={'focused'}
                                                      activeLabelColor="#333333"
                                                      activeIndicatorColor="#333333"
                                                      inactiveLabelColor="#CCCCCC"
                                                      inactiveIndicatorColor="transparent"
                                                      indicatorHeight={2}
                                                      navigation={navigation}/>,

    tabBarPosition: 'top'
}
/** TimeLine **/
import TimeLine from '../../screens/TimeLine';

const ProfileTab = TabNavigator({
    Infos: {
        screen: Profil,
        navigationOptions: {
            header: null,
        }
    },
    Actus: {
        screen: Actus,
        navigationOptions: {
            header: null,
        }
    }

},PROFILETAB);

const MenuStack = StackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: {
            header: null,
        }
    },
    Profile: {
        screen: ProfileTab,
        navigationOptions: {
            header: null,
        }
    }
},{
    lazy:true,
    initialRouteName: "Menu",

});

const MainStack = TabNavigator({
    TimeLine: {
        screen: TimeLine,
        navigationOptions: ({navigation}) => ({
            header: props => <Header headerType="text" backIcon={false} {...props} />,
            tabBarIcon: ({focused}) => {
                return <Image
                    resizeMode='contain'
                    source={!focused ? require('../../assets/img/picto/menu/tabbar/timeline.png') : require('../../assets/img/picto/menu/tabbar/timeline-on.png')} style={{ height: 20 }}/>
            },
            showLabel: true,
            tabBarLabel: 'Actualitée'
        }),
    },
    Rechercher: {
        screen: TimeLine,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                return <Image
                    resizeMode='contain'
                    source={!focused ? require('../../assets/img/picto/menu/tabbar/search.png') : require('../../assets/img/picto/menu/tabbar/search-on.png')}
                    style={{height: 20}}/>
            },
            showLabel: true,
            tabBarLabel: 'Rechercher'
        })
    },
    Notifications: {
        screen: TimeLine,
        navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
            return <Image
                resizeMode='contain'
                source={!focused ? require('../../assets/img/picto/menu/tabbar/notification.png') : require('../../assets/img/picto/menu/tabbar/notification-on.png')} style={{ height: 20 }}/>
        },
        showLabel: true,
        tabBarLabel: 'Notifications'
        })
    },
    Menu: {
        screen: MenuStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                return <Image
                    resizeMode='contain'
                    source={!focused ? require('../../assets/img/picto/menu/tabbar/menu.png') : require('../../assets/img/picto/menu/tabbar/menu-on.png')}
                    style={{height: 20}}/>
            },
            showLabel: true,
            tabBarLabel: 'Menu'
        })
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,

    tabBarOptions: { showIcon: true,
        activeTintColor:'#003366',
        inactiveTintColor: '#cccccc',
        upperCaseLabel: false,
        labelStyle: {
            fontSize: 12,
            marginTop:5,
            marginBottom:0,
        },
        tabStyle: {
        paddingTop:10,
            height:60,
        },
        indicatorStyle: { backgroundColor: 'transparent', },
        style: {
            backgroundColor: '#ffffff',
    }, }
});
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
        },
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