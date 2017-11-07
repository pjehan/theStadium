import React, {Component} from 'react';

import {View,StyleSheet,Button,DatePickerAndroid,Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
import TabView from 'react-navigation'
export default class userBasic extends Component {

    constructor(props){
        super(props);
        this.state = {
          lastname: '',
          firstname: '',
          date: '',
        }
    }
    onChangeInfos(state, newvalue) {
      console.log(state,newvalue)
      this.setState({[state]: newvalue})
    }
    render() {
      var Coach = null;
      if(this.props.navigation.state.params.coach) {
        Coach = <CustomInput
        container={''}
        placeholder={'Nom du club'}
        input={styles.input}
        state={'club'}
        onChangeParent={() => {(state,newvalue) => {this.onChangeInfos(state, newvalue)}}}/>
      }
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
                        placeholder={'Nom'}
                        input={styles.input}
                        state={'lastname'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                        container={''}
                        placeholder={'Prénom'}
                        input={styles.input}
                        state={'name'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <Button onPress={() => {
                      try {
                          const {action, year, month, day} = DatePickerAndroid.open({
                            // Use `new Date()` for current date.
                            // May 25 2020. Month 0 is January.
                            date: new Date(2020, 4, 25)
                          });
                          if (action !== DatePickerAndroid.dismissedAction) {
                            // Selected year, month (0-11), day
                          }
                        } catch ({code, message}) {
                          console.warn('Cannot open date picker', message);
                        }
                    }} title="Date de naissance"
                    />
                    {Coach}
                </KeyboardAvoidingView>
            </View>
        )
    }
}
