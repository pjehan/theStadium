import React, {Component} from 'react';

import {View,StyleSheet,Button,DatePickerAndroid,Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {styles} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
export default class userBasic extends Component {

    constructor(props){
        super(props);
        this.state = {
          lastname: '',
          firstname: '',
          birthdate: '',
        };
        this.onChangeInfos = this.onChangeInfos.bind(this)
    }
    onChangeInfos(state, newvalue) {
      this.setState({[state]: newvalue})
    }

    render() {
      let Coach = null;
      if(this.props.navigation.state.params.coach) {
        Coach = <CustomInput
        container={''}
        placeholder={'Nom du club'}
        input={styles.input}
        state={'club'}
        textColor={'#333333'}
        borderColor={'transparent'}
        backgroundColor={'#eeeeee'}
        onChangeParent={() => {(state,newvalue) => {this.onChangeInfos(state, newvalue)}}}/>
      }
        return (
            <View style={{flex: 7, backgroundColor:'white',justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

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
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={'Nom'}
                        input={styles.input}
                        state={'lastname'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                        container={''}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={'Prénom'}
                        input={styles.input}
                        state={'name'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                    type={'date'}
                    container={''}
                    textColor={'#333333'}
                    borderColor={'transparent'}
                    backgroundColor={'#eeeeee'}
                    placeholder={'Date de naissance'}
                    state={'birthdate'}
                    input={styles.input}
                    format={'date'}
                    onChangeParent={(state,newvalue) => {this.onChangeInfos(state,newvalue)}}
                    />
                    {Coach}
                </KeyboardAvoidingView>
            </View>
        )
    }
}
