import React, { Component } from 'react';
import { Text, View, Image, TextInput, Button } from 'react-native';

import { styles } from '../assets/css/global';

export default class Login extends Component {
constructor(props) {
  super(props);

  this.state = {
    email: '',
    password: '',
  }
}

  render() {
    return (
      <View style={[styles.mainColorBG, styles.justifyStretch]}>
        <Image style={styles.middleLogo} source={require('../assets/img/logo-blanc.png')} />
        <Text style={styles.slogant}>Partagez et suivez lactualité du foot amateur</Text>

        <TextInput style={styles.input} onChangeText={(email) => this.setState({email})}
        defaultValue="Votre identifiant"
        value={this.state.email} />

        <TextInput style={styles.input} onChangeText={(password) => this.setState({password})}
        defaultValue="Votre mot de passe"
        value={this.state.password}
        secureTextEntry={true}/>
        <Button onPress={() => {}} style={styles.loginButton} title="Connexion" />
      </View>
    )
  }
}
