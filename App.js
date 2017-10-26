import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './app/config/router';

import { styles } from './app/assets/css/global';

export default class App extends Component {
  render() {
    return (
      <Tabs />
    );
  }
}
