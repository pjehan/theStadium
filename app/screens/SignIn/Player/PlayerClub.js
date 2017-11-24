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
  constructor(props) {
    super(props);
    this.state = {
      team: '',
      poste: '',
    }
  }
    render() {
        return (
          <View style={{flex: 7,backgroundColor:'white', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

              <View style={{flex: 2, justifyContent: 'center'}}>
                  <Text style={[styles.h1, styles.mainColor]}>Le football et vous</Text>
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
                      textColor={'#333333'}
                      borderColor={'transparent'}
                      backgroundColor={'#eeeeee'}
                      onChangeParent={() => {console.log(this.state)}}
                  />
                    <View style={{backgroundColor:'#eeeeee'}}>
                  <Picker style={styles.input}
                    selectedValue={this.state.team}
                    prompt="Votre équipe"
                    onValueChange={itemValue => this.setState({ team: itemValue })}>
                    {programmingLanguages.map((i, index) => (
                      <Picker.Item key={index} label={i.label} value={i.value} />
                    ))}
              </Picker>
            </View>
            <View style={{backgroundColor:'#eeeeee'}}>
          <Picker style={styles.input}
          prompt="Poste joué"
    selectedValue={this.state.poste}
    onValueChange={itemValue => this.setState({ poste: itemValue })}>
    {programmingLanguages.map((i, index) => (
      <Picker.Item key={index} label={i.label} value={i.value} />
    ))}
      </Picker>
    </View>
    <View style={{justifyContent:'flex-start', alignItems: 'flex-start'}}>
      <Text style={{fontSize:12}}>Le nom de votre club napparait pas dans la liste </Text>
      <Text style={{fontSize:12}}>Signalez un problème </Text>
    </View>
              </KeyboardAvoidingView>
          </View>
        )
    }

}
