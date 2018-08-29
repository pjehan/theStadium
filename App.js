import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux"


import {styles} from './app/assets/css/global';
import {AppNavigator, middleware} from "./app/routes/MainNavigators";
import {AppRegistry} from "react-native";
import AppReducer from "./app/_reducers/index";

const store = createStore(AppReducer, applyMiddleware(middleware));

class App extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Provider ref={(c) => this._root  = c} store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('theStadium', () => App);

export default App;

