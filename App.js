import React, {Component} from 'react';
import AppNavigation from './app/config/router/router';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import promise from "redux-promise-middleware"
import appReducer from './app/_reducers';
import createLogger from 'redux-logger';
import SocketIOClient from 'socket.io-client';

import {emit, init as websocketInit} from './app/_actions/websockets';


import {styles} from './app/assets/css/global';
import {ChoiceModalContainer} from "./app/components/ChoiceModal/index";
import {utils} from "./app/_constants/utils";


function initialize() {

    const middleware = [ thunkMiddleware.withExtraArgument({ emit }) ];
    if (__DEV__) {
        middleware.push(createLogger())
    }
    let store = createStore(appReducer, applyMiddleware(promise(), ...middleware));
    websocketInit(store);

    return store
}

export default class App extends Component {

    constructor() {
        super();

        this.socket = SocketIOClient(utils.NODEJS);
    }

  render() {

    return (
      <Provider ref={c => (this._root = c)}  store={initialize()}>
        <AppNavigation/>
      </Provider>

    );
  }
}
