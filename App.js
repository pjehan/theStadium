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
import {ChoiceModalContainer} from "./app/components/ChoiceModal/index";

const logger = createLogger({
    // ...options
});
const MIDDLEWARE = applyMiddleware(promise(), thunk, logger);


export default class App extends Component {

  render() {
      let store = createStore(appReducer, MIDDLEWARE);
    return (
      <Provider  ref={c => (this._root = c)}  store={store}>
        <AppNavigation/>
      </Provider>

    );
  }
}
