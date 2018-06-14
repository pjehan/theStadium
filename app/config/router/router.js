import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, View} from 'react-native';
import {StackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import {Button, Text} from 'react-native';
//import { Icon } from 'react-native-elements';

import Login from '../../screens/Login';
import Loading from '../../screens/Loading';

import Menu from '../../components/Main/Menu'
/** SIGN IN**/
import SignIn from '../../screens/SignIn/SignIn';
import UserBasic from '../../screens/SignIn/UserBasic'
import Header from '../../layout/Header.js';
import UserInfos from '../../screens/SignIn/UserInfos';
import PlayerClub from '../../screens/SignIn/Player/PlayerClub';
import Congratz from '../../screens/SignIn/Congratz';
/** Tab **/
import PlayerSignInTabView from '../../screens/SignIn/Player/PlayerSignInTabView';
import MainTabView from '../../components/Main/TabBar'


import Profil from '../../screens/Profil';
import ProfileTabBar from '../../components/Profil/profilTab';
import Actus from '../../screens/Actus';
import Gallery from '../../screens/Gallery';

/** PostModal **/
import Setup from '../../components/TimeLine/Post/PostModal/postArticle/setup';
import FirstHalf from '../../components/TimeLine/Post/PostModal/postArticle/firsthalf';
import SecondHalf from '../../components/TimeLine/Post/PostModal/postArticle/secondhalf';

const SignInTabBar = {
    tabBarComponent: ({navigation}) => <PlayerSignInTabView navigation={navigation}/>,
    tabBarVisible: false,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
};
const PROFILETAB = {
    tabBarComponent: ({navigation}) => <ProfileTabBar focused={'focused'}
                                                      activeLabelColor="#333333"
                                                      activeIndicatorColor="#333333"
                                                      inactiveLabelColor="#CCCCCC"
                                                      inactiveIndicatorColor="transparent"
                                                      indicatorHeight={2}
                                                      navigation={navigation}/>,

    tabBarPosition: 'top',
};
/** TimeLine **/
import TimeLine from '../../screens/TimeLine';
import Search from "../../screens/Search";
import Sexe from "../../screens/SignIn/Sexe";
import Contact from "../../screens/Contact";
import ArticleTabHeader from "../../components/TimeLine/Post/PostModal/postArticle/ArticleTabHeader";
import conclusion from "../../components/TimeLine/Post/PostModal/postArticle/conclusion";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view/lib/KeyboardAwareScrollView";
import ArticleTabFooter from "../../components/TimeLine/Post/PostModal/postArticle/ArticleTabFooter";
import {ChoiceModalContainer} from "../../components/ChoiceModal/index";
const ArticleTabInside = TabNavigator({
    Setup: {
        screen:  props => <Setup {...props} />,
        navigationOptions: {
            title: 'Profile',
            headerTitle: 'Profile',
            tabBarLabel: 'Profile',
        }
    },
    firstHalf: {
        screen: props =>  <FirstHalf {...props} />,
        navigationOptions: {
            header: null,
        },
        tabBarLabel: 'Première mi-temps'
    },
    secondHalf: {
        screen: SecondHalf,
        navigationOptions: {
            header: null,

        },
    },
    conclusion: {
        screen: conclusion,
        navigationOptions: {
            header: null,
        },
    }
}, {
    tabBarComponent: ArticleTabHeader,
    tabBarVisible: false,
    tabBarPosition: 'top',
});

export class AvoidArticle extends Component {
    render() {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={-50}
                style={{flex: 1,
                    justifyContent: 'flex-end',backgroundColor:'white',}}
                contentContainerStyle={{
                    flex: 1,
                    width:"100%",
                    justifyContent: 'flex-end',backgroundColor:'white',
                }}
                behavior="position" enabled>
                <ArticleTabInside />

            </KeyboardAvoidingView>
        )
    }
}
const ArticleTab = StackNavigator({
    ArticleTabK: {
        screen: AvoidArticle,
        navigationOptions: {
            header: null,
        }
    }
}, {initialRouteName:'ArticleTabK'});


const TeamProfile = TabNavigator({

    Actus: {
        screen: Actus,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: 'Actualitées'
        })
    },
    Gallerie: {
        screen: Gallery,
        navigationOptions: {
            header: null,
        }
    },
    Contacts: {
        screen: Contact,
        navigationOptions: {
            header: null,
        }
    },

}, PROFILETAB);

const SupporterProfile = TabNavigator({

    Actus: {
        screen: Actus,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: 'Actualitées'
        })
    },
    Gallerie: {
        screen: Gallery,
        navigationOptions: {
            header: null,
        }
    }

}, PROFILETAB);
const ProfileTab = TabNavigator({

    Actus: {
        screen: Actus,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: 'Actualitées'
        })
    },
    Caracteristique: {
        screen: Profil,
        navigationOptions: {
            header: null,
        }
    },
    Gallerie: {
        screen: Gallery,
        navigationOptions: {
            header: null,
        }
    }

}, PROFILETAB);

const MenuStack = StackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: {
            header: null,
        }
    },

}, {
    lazy: true,
    initialRouteName: "Menu",

});

const MainStack = TabNavigator({
    TimeLine: {
        screen: TimeLine,
        navigationOptions: ({navigation}) => ({
            header: props => <Header headerType="logo" backIcon={false} {...props} />,
            tabBarIcon: ({focused}) => {
                return <Image
                    resizeMode='contain'
                    source={!focused ? require('../../assets/img/picto/menu/tabbar/timeline.png') : require('../../assets/img/picto/menu/tabbar/timeline-on.png')}
                    style={{height: 20}}/>
            },
            showLabel: true,
            tabBarLabel: 'Actualitée'
        }),
    },
    Rechercher: {
        screen: Search,
        navigationOptions: ({navigation}) => ({
            header: props => <Header headerType="logo" backIcon={false} {...props} />,
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
        screen: Search,
        navigationOptions: ({navigation}) => ({
            header: props => <Header headerType="logo" backIcon={false} {...props} />,
            tabBarIcon: ({focused}) => {
                return <Image
                    resizeMode='contain'
                    source={!focused ? require('../../assets/img/picto/menu/tabbar/notification.png') : require('../../assets/img/picto/menu/tabbar/notification-on.png')}
                    style={{height: 20}}/>
            },
            showLabel: true,
            tabBarLabel: 'Notifications'
        })
    },
    Menu: {
        screen: MenuStack,
        navigationOptions: ({navigation}) => ({
            header: props => <Header headerType="logo" backIcon={false} {...props} />,
            tabBarIcon: ({focused}) => {
                return <Image
                    resizeMode='contain'
                    source={!focused ? require('../../assets/img/picto/menu/tabbar/menu.png') : require('../../assets/img/picto/menu/tabbar/menu-on.png')}
                    style={{height: 20}}/>
            },
            showLabel: true,
            tabBarLabel: 'Menu'
        })
    },

}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,

    tabBarOptions: {
        showIcon: true,
        activeTintColor: '#003366',
        inactiveTintColor: '#cccccc',
        upperCaseLabel: false,
        allowFontScaling:true,
        labelStyle: {
            fontSize: 10,
            marginTop: 5,
            marginBottom: 0,
        },
        tabStyle: {
            paddingTop: 10,
            height: 60,
            shadowColor: 'black',
            shadowOpacity: 1, elevation: 4,

        },
        indicatorStyle: {backgroundColor: 'transparent',},
        style: {
            backgroundColor: '#ffffff',
            borderTopWidth: 2, borderTopColor: '#cccccc'
        },
    }
});
export const PlayerSignInStack = TabNavigator({
        Player: {
            screen: UserBasic,
        },
        PlayerInfosfrom: {
            screen: UserInfos,
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
                teamList: navigation.state.params.teamList,
                clubList: navigation.state.params.clubList
            })
        },
        CoachInfos: {
            screen: UserInfos,
            navigationOptions: ({navigation}) => ({
                header: props => <Header {...props} />,
                teamList: navigation.state.params.teamList,
                clubList: navigation.state.params.clubList
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
        Article: {
            screen: ArticleTab,
            navigationOptions: {
                header: null,
            }
        },
        Profile: {
            screen: ProfileTab,
            navigationOptions: {
                header: null,
            }
        },
        FanProfile: {
            screen: SupporterProfile,
            navigationOptions: {
                header: null,
            }
        },
        CoachProfile: {
            screen: TeamProfile,
            navigationOptions: {
                header: null,
            }
        },
        ArticleTab: {
            screen: ArticleTab,
            navigationOptions: {
                header: null,
            }
        },
        Congratz: {
            screen: Congratz,
            navigationOptions: {
                header: null,
            }
        },
        FirstHalf: {
            screen: FirstHalf,
            navigationOptions: {
                header: null
            }
        },
        SecondHalf: {
            screen: SecondHalf,
            navigationOptions: {
                header: null
            }
        },
        SignIn: {
            screen: SignIn,
            navigationOptions: ({navigation}) => ({
                header: props => <Header headerType="logo" backIcon={true} {...props} />
            })
        },
        Sexe: {
            screen: Sexe,
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

class Root extends Component {
    render() {
        return (
            <View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
                {this.props.children}
                <ChoiceModalContainer
                    ref={c => {
                        if (c)
                            ChoiceModalContainer.choiceModalInstance = c;
                    }}
                />
            </View>
        )
    }
}
class AppNavigation extends Component {
    render() {
        const {navigationState, dispatch} = this.props;
        return (
            <Root >
                <Navigator
                    navigation={addNavigationHelpers({dispatch, state: navigationState})}
                />
            </Root>
        );
    }
}

const mapStateToProps = state => {
    return {
        navigationState: state.NavigationReducer,
        inspectedUser: state.inspectedUser,
        currentUser: state.currentUser,
    };
};
export default connect(mapStateToProps)(AppNavigation);