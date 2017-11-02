import React, {Component} from 'react';

import {View,StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
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
export default class PlayerSignIn extends Component {

    constructor(props){
        super(props);

        this.state = {
        };
    }
    render() {
        return (
            <View style={{flex: 7, justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={[styles.h1, styles.mainColor]}>Création de votre profil</Text>
                    <Text style={[styles.miniDescription]}>
                        Ajoutez de vraies informations pour vous permettre d'échanger avec les joueurs et les clubs
                    </Text>
                </View>

                <KeyboardAvoidingView
                    style={{flex:3, justifyContent: 'space-around', alignItems:'center'}}
                    behavior="padding">
                    <CustomInput
                        container={''}
                        placeholder={'Nom'}
                        input={styles.input}
                        state={'email'}
                        onChangeParent={() => {}}
                    />
                    <CustomInput
                        container={''}
                        placeholder={'Prénom'}
                        input={styles.input}
                        state={'password'}
                        onChangeParent={() => {}}
                    />
                    <CustomInput
                        container={''}
                        placeholder={'Date de naissance'}
                        input={styles.input}
                        state={'password'}
                        onChangeParent={() => {}}
                    />
                </KeyboardAvoidingView>
                <View style={{flex:2}}></View>
            </View>
        )
    }
}