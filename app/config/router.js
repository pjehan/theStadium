import React from 'react';
import { StackNavigator } from 'react-navigation';

import { Button, Text} from 'react-native';
//import { Icon } from 'react-native-elements';

import Login from '../screens/Login';
import Loading from '../screens/Loading';
import SignIn from '../screens/SignIn/SignIn';

import Header from '../components/Header.js';

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
      navigationOptions: ({ navigation }) => ({
    header: props => <Header {...props} />
})
  }
},
{
    initialRouteName: "Loading",
    headerMode: "screen"
  });
/*export const signInTabs = TabNavigator({

});*/