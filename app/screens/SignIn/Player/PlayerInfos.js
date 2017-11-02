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
export default class PlayerInfos extends Component {
    render() {
        return (
            <Text>Je ne sais pas</Text>
        )
    }

}