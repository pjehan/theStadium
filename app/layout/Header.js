/**
 * Created by panaa on 31/10/17.
 */
import React, {Component} from 'react';
import { View, Platform, StatusBar, Image,Text, TouchableHighlight } from 'react-native';
import { styles } from '../assets/css/global';
import {Icon} from 'react-native-elements';
import Expo from 'expo';
//[styles.outerContainer]}
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
render() {
    var headerText;
    var icon;
    if(this.props.headerType === 'logo') {
        headerText = <Image style={[styles.headerMiddleLogo]}
                            source={require('../assets/img/logo-blanc.png')} />;
    } else {
        headerText = <Text>TheStadium</Text>
    }
    if(this.props.backIcon) {
        icon = <Icon style={{position: 'absolute', left: 0}}
                     color='white'
                     size={40}
                     name={'chevron-left'}
                     onPress={() => this.props.navigation.goBack(null)}/>
    } else {
        icon = null;
    }
    return (

        <View
            style={[styles.outerContainer, {paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}]}>
            <StatusBar translucent={false} />
            <View style={styles.innerContainer}>
                {icon}
                {headerText}
            </View>
        </View>
    )}
}/*<TouchableHighlight onPress={() => this.props.navigation.goBack(null)}>
</TouchableHighlight>*/
