import React from 'react';
import { StackNavigator } from 'react-navigation';
//import { Icon } from 'react-native-elements';

import Login from '../screens/Login';
import Loading from '../screens/Loading';

export const Tabs = StackNavigator({
  Loading: {
    screen: Loading
  },
  Login: {
    screen: Login
  }
},
{
    initialRouteName: "Loading",
    headerMode: "none"
  });
