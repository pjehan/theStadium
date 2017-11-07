import React, {Component} from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import { styles } from '../../assets/css/global';
import {Col} from 'react-native-elements'

export default class SignIn extends Component {

    render() {
        var {navigate} = this.props.navigation
        return (
            <View style={{flex: 6, justifyContent:'flex-start', paddingLeft:60, paddingRight:60}}>
                <View style={{flex:2, justifyContent:'center'}}>
                    <Text style={[styles.h1, styles.mainColor]}>Bienvenue</Text>
                    <Text style={[styles.description, styles.mainColor]}>Quel profil êtes-vous ?</Text>
                </View>
                <View  style={{flex:3, justifyContent:'space-around'}}>
                    <Button
                        onPress={() => {navigate('FanSignIn',{})}}
                        title="Supporter"
                        color="#003366"
                    />
                    <Button
                        onPress={() => {navigate('PlayerSignIn',{})}}
                        title="Joueur"
                        color="#003366"
                    />
                    <Button
                        onPress={() => {
                          navigate('CoachSignIn',{coach: true})
                        }
                      }
                        title="Entraineur"
                        color="#003366"
                    />
                </View>
                <View style={{flex:1}}></View>
            </View>
        )
    }
}
