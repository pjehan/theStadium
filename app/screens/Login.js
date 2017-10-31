import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    Text,
    View,
    Image,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import orientation from '../config/orientation';
import { styles } from '../assets/css/global';
import CustomInput from '../components/CustomInput';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      databse: '',
        orientation: orientation.isPortrait() ? 'portrait' : 'landscape',
        devicetype: orientation.isTablet() ? 'tablet' : 'phone'
    };
    Dimensions.addEventListener('change', () => {
          this.setState({
              orientation: orientation.isPortrait() ? 'portrait' : 'landscape'
          });
      })
  }

  onChange(state, newvalue) {
    this.setState({[state]: newvalue})
  }
  loginIn() {
    //fetch to databse

  }
  render() {
      var {navigate} = this.props.navigation;

    return (
        <ScrollView contentContainerStyle={[styles.mainColorBG, styles.justifyStretch]} >
            <View >
                <Image style={styles.middleLogo} source={require('../assets/img/logo-blanc.png')} />
                <Text style={styles.slogant}>Partagez et suivez l'actualité du foot amateur</Text>
            </View>
      <KeyboardAvoidingView
          behavior="padding">

        <View>
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
                  <TouchableOpacity style={styles.loginButton} onPress={() => {this.loginIn()}}>
                    <Text>Connexion</Text>
                  </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
        <View>
          <Text style={{marginBottom: 20, color: 'white'}} onPress={() => navigate("SignIn", {})} >Pas encore inscrit ?</Text>
          <TouchableOpacity onPress={() => navigate("SignIn", {})} disabled={!!(this.state.email && this.state.password)} style={styles.loginButton} >
            <Text style={styles.loginText}>Démmarer l'inscription</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    )
  }
};
