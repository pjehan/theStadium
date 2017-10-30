import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
//import { Icon } from 'react-native-elements';

import Login from '../screens/Login';
import Loading from '../screens/Loading';
import SignIn from '../screens/SignIn/SignIn'

export const Navigator = StackNavigator({
  Loading: {
    screen: Loading
  },
  Login: {
    screen: Login
  },
  SignIn: {
    screen: SignIn
  }
},
{
    initialRouteName: "Loading",
    headerMode: "none"
  });
/*export const signInTabs = TabNavigator({

});*/