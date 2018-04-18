import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './app/config/router/router';

import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import appReducer from './app/_reducers';
import createLogger from 'redux-logger'


import { styles } from './app/assets/css/global';
import setAuthorizationToken from "./app/config/setAuthorizationToken";

const logger = createLogger({
    // ...options
});
const MIDDLEWARE = applyMiddleware(promise(), thunk);

export default class App extends Component {

  render() {
      let store = createStore(appReducer, MIDDLEWARE);
    return (
      <Provider store={store}>
      <AppNavigation />
      </Provider>
    );
  }
}
