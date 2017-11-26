import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigator } from './app/config/router/router';


import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appReducer from './app/_reducers';

import { styles } from './app/assets/css/global';


export default class App extends Component {

  render() {
      let store = createStore(appReducer);
    return (
      <Provider store={store}>
      <Navigator />
      </Provider>
    );
  }
}
