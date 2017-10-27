import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, TextInput, Button } from 'react-native';
import { styles } from '../assets/css/global';
import CustomInput from '../components/CustomInput';
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      databse: '',
    }
  }

  onChange(state, newvalue) {
    this.setState({[state]: newvalue})
  }
  logginIn() {
    //fetch to databse

  }
  render() {
    return (
      <View style={[styles.mainColorBG, styles.justifyStretch]}>
      <View>
        <Image style={styles.middleLogo} source={require('../assets/img/logo-blanc.png')} />
        <Text style={styles.slogant}>Partagez et suivez lactualité du foot amateur</Text>
      </View>
        <View >
        <Text>{this.state.databse}</Text>
          <CustomInput
              container={''}
              placeholder={'Votre Identifiant'}
              input={styles.input}
              state={'email'}
              security={false}
              onChangeParent={(state,newvalue) => this.onChange(state,newvalue)}
              />
          <CustomInput
                  container={''}
                  placeholder={'Votre Mot de Passe'}
                  input={styles.input}
                  security={true}
                  state={'password'}
                  onChangeParent={(state,newvalue) => this.onChange(state,newvalue)}
                  />
                  <TouchableOpacity style={styles.loginButton} onPress={() => {this.logginIn()}}>
                    <Text>Connexion</Text>
                  </TouchableOpacity>
        </View>
        <View>
          <Text>Pas encore inscrit ?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => {this.logginIn()}}>
            <Text>Démmarer l'inscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};
