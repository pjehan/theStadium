import React, {Component} from 'react';

import {View,StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity, Picker, Item} from 'react-native';
import {styles} from '../../../assets/css/global';
import CustomInput from '../../../components/CustomInput';
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
const programmingLanguages = [
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Ruby',
    value: 'ruby',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'Go',
    value: 'go',
  }
];
export default class PlayerInfos extends Component {
  constructor() {
    super();
    this.state = {
      team: '',
      poste: '',
    }
  }
    render() {
        return (
          <View style={{flex: 7, justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

              <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text style={[styles.h1, styles.mainColor]}>Création de votre profil</Text>
                  <Text style={[styles.miniDescription]}>
                      Ajoutez de vraies informations pour vous permettre déchanger avec les joueurs et les clubs
                  </Text>
              </View>

              <KeyboardAvoidingView
                  style={{flex:3, justifyContent: 'space-around', alignItems:'center'}}
                  behavior="padding">
                  <CustomInput
                      container={''}
                      placeholder={'Nom de votre club'}
                      input={styles.input}
                      state={'club'}
                      onChangeParent={() => {}}
                  />
                    <View style={[this.props.container,this.props.inputContainer]}>
                  <Picker style={styles.input}
                    selectedValue={this.state.team}
                    prompt="Votre équipe"
                    onValueChange={itemValue => this.setState({ team: itemValue })}>
                    {programmingLanguages.map((i, index) => (
                      <Picker.Item key={index} label={i.label} value={i.value} />
                    ))}
              </Picker>
            </View>
            <View style={[this.props.container,this.props.inputContainer]}>
          <Picker style={styles.input}
          prompt="Poste joué"
    selectedValue={this.state.poste}
    onValueChange={itemValue => this.setState({ poste: itemValue })}>
    {programmingLanguages.map((i, index) => (
      <Picker.Item key={index} label={i.label} value={i.value} />
    ))}
      </Picker>
    </View>
              </KeyboardAvoidingView>
          </View>
        )
    }

}
