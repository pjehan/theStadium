/**
 * Created by panaa on 31/10/17.
 */
import React, {Component} from 'react';
import { View, Platform, StatusBar, Image, TouchableHighlight } from 'react-native';
import { styles } from '../assets/css/global';
import Expo from 'expo'
//[styles.outerContainer]}
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
render() {
    var {navigate} = this.props.navigation
    return (
        <View
            style={[styles.outerContainer, {paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}]}>
            <StatusBar backgroundColor='red' />
            <View style={[styles.innerContainer]}>
                <TouchableHighlight onPress={() => navigate('Login', {})}>
                    <Image style={styles.headerMiddleLogo} source={require('../assets/img/logo-blanc.png')} />
                </TouchableHighlight>
            </View>
        </View>
    )}
}