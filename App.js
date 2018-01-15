import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigator } from './app/config/router/router';


import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import appReducer from './app/_reducers';
import createLogger from 'redux-logger'


import { styles } from './app/assets/css/global';

const logger = createLogger({
    // ...options
});
const MIDDLEWARE = applyMiddleware(promise(), thunk, logger);

export default class App extends Component {

  render() {
      let store = createStore(appReducer, MIDDLEWARE);

    return (
      <Provider store={store}>
      <Navigator />
      </Provider>
    );
  }
}
