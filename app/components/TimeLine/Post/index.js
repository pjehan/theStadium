import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../../../assets/css/global';
import { StyleSheet, Image } from 'react-native';
const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width:'100%',
        padding:5,
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius:45
    },
    text: {
        color:'black'
    },
    userAction: {
        flexDirection: 'row',
    },
    ownerStyle: {
        flexDirection: 'row',
    }
});
export default class Post extends Component {

    render() {
        return (
         <View style={PostStyle.container}>
            <View style={PostStyle.ownerStyle}>
                <Image style={PostStyle.profilePic} source={require('../../../assets/img/TA-Rennes.jpg')}/>
                <Text style={PostStyle.text}>Je m'appelle bibi</Text>
            </View>
             <View style={PostStyle.userAction}>
                 <Text style={PostStyle.text}>Jaime</Text>
                 <Text style={PostStyle.text}>Commenter</Text>
                 <Text style={PostStyle.text}>Partager</Text>
             </View>
         </View>
        )
    }
}