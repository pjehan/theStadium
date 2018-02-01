import React, {Component} from 'react';

import {View,StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
const style = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: 48,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});
class PlayerInfos extends Component {
  constructor(props) {
    super(props);
    this.state={
      email : ''
    };
    this.onChangeInfos = this.onChangeInfos.bind(this)
  }
  onChangeInfos(state, newvalue) {
      this.props.user[state] = newvalue;
      this.setState({[state]: newvalue});
  }

    render() {
        return (
          <View style={{flex: 7,backgroundColor:'white', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

              <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Création de votre profil</Text>
                  <Text style={[GLOBAL_STYLE.miniDescription]}>
                      Ajoutez de vraies informations pour vous permettre déchanger avec les joueurs et les clubs
                  </Text>
              </View>

              <KeyboardAvoidingView
                  style={{flex:3, justifyContent: 'space-around', alignItems:'center'}}
                  behavior="padding">
                  <CustomInput
                      container={''}
                      placeholder={'Adresse e-mail'}
                      input={GLOBAL_STYLE.input}
                      state={'email'}
                      textColor={'#333333'}
                      borderColor={'transparent'}
                      backgroundColor={'#eeeeee'}
                      onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                  />
                  <CustomInput
                      container={''}
                      placeholder={'Mot de passe'}
                      input={GLOBAL_STYLE.input}
                      state={'password'}
                      textColor={'#333333'}
                      borderColor={'transparent'}
                      backgroundColor={'#eeeeee'}
                      security={true}
                      onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                      description={'Combinaison de 6 caractères minimum. Lettres et chiffres obligatoires.'}
                  />
                  <CustomInput
                      container={''}
                      placeholder={'Confirmer le mot de passe'}
                      input={GLOBAL_STYLE.input}
                      state={'password'}
                      textColor={'#333333'}
                      borderColor={'transparent'}
                      backgroundColor={'#eeeeee'}
                      security={true}
                      onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                  />
              </KeyboardAvoidingView>
          </View>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};
export default connect(mapStateToProps)(PlayerInfos);