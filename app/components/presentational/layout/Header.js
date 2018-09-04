/**
 * Created by panaa on 31/10/17.
 */
import React, {Component} from 'react';
import {View, Platform, StatusBar, Image, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import { GLOBAL_STYLE } from '../../../assets/css/global';
import {Icon} from 'react-native-elements';
import Expo from 'expo';
//[GLOBAL_STYLE.outerContainer]}
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
render() {
    var headerText;
    var icon;
    if(this.props.headerType === 'logo') {
        headerText = <Image style={[GLOBAL_STYLE.headerMiddleLogo]}
                            source={require('../../../assets/img/thestadium/logo-blanc.png')} />;
    } else {
        headerText = this.props.headerText ? this.props.headerText : 'TheStadium'
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
            style={[GLOBAL_STYLE.outerContainer, {paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}]}>
            <StatusBar translucent={false} />
            <View style={[GLOBAL_STYLE.innerContainer]}>
                {icon}
            <Text style={{fontWeight:'600',color:'#ffffff',fontSize:18}}>{headerText}</Text>
                {this.props.action ?
                    <TouchableOpacity style={{position:'absolute', right:0}} onPress={() => this.props.actionTriggered()}>
                        <Text style={{fontWeight:'600',color:'#ffffff'}}>{this.props.actionText}</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
        </View>
    )}
}/*<TouchableHighlight onPress={() => this.props.navigation.goBack(null)}>
</TouchableHighlight>*/
