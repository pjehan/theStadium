/**
 * Created by panaa on 31/10/17.
 */
import React, {Component} from 'react';
import { View, Platform, StatusBar, Image, TouchableHighlight } from 'react-native';
import { styles } from '../assets/css/global';
import {Icon} from 'react-native-elements';
import Expo from 'expo';
//[styles.outerContainer]}
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
render() {
    return (

        <View
            style={[styles.outerContainer, {paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}]}>
            <StatusBar translucent={false} />
            <View style={styles.innerContainer}>
                <Icon style={{position: 'absolute', left:0}}
                      color='white'
                      size={30}
                      name={'chevron-left'}
                      onPress={() => this.props.navigation.goBack(null)} />
                <Image style={[styles.headerMiddleLogo]}
                       source={require('../assets/img/logo-blanc.png')} />
            </View>
        </View>
    )}
}/*<TouchableHighlight onPress={() => this.props.navigation.goBack(null)}>
</TouchableHighlight>*/