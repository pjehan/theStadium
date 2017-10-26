import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { styles } from '../assets/css/global';
import CustomInput from '../components/CustomInput';
export default class Login extends Component {
constructor(props) {
  super(props);

  this.state = {
    email: '',
    password: '',
      defaultValue: 'Pass'
  }
}

  render() {
    return (
      <View style={[styles.mainColorBG, styles.justifyStretch]}>
        <Image style={styles.middleLogo} source={require('../assets/img/logo-blanc.png')} />
        <Text style={styles.slogant}>Partagez et suivez lactualité du foot amateur</Text>
        <CustomInput
            default={this.state.defaultValue}
            container={styles.container}
            input={styles.input}
            value={this.state.email} />

      </View>
    )
  }
};
