import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator,addNavigationHelpers } from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {View} from "react-native";
import {ChoiceModalContainer} from "../components/ChoiceModal/index";
import Login from "../screens/Login";


const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.NavigationReducer
);

const AppNavigator = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
    },
    {
        initialRouteName: "Login",
        headerMode: "screen"
    });
/*
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
class AppNavigator extends Component {
    render() {
        const {state, dispatch} = this.props;
        return (
            <Root >
                <Navigator
                    navigation={{dispatch, state: state}}
                />
            </Root>
        );
    }
}
*/
const AppWithNavigationState = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => {
    return {
        state: state.NavigationReducer,
    };
};

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { AppNavigator, AppNavigator, middleware };



/*

        Congratz: {
            screen: Congratz,
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
 */