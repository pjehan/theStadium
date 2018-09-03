import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {styles} from './app/assets/css/global';
import {Root, configureStore} from "./app/routes/MainNavigators";
import {AppRegistry} from "react-native";


class App extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Provider ref={(c) => this._root  = c} store={configureStore()}>
                <Root />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('theStadium', () => App);

export default App;

