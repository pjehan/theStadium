import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Image } from 'react-native';

import { styles } from '../assets/css/global';
import Post from '../components/TimeLine/Post';

const timeLineStyle = StyleSheet.create({
    tabContainer: {
        justifyContent: 'space-between',
        backgroundColor:'#ffffff',
        flexDirection:'row',
        width: '100%',
        height: 40
    },
    tabButton: {
        backgroundColor: 'white',
        flex:1,
        height:'100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tabButtonText:{
        color: '#003366',
        fontWeight: '400',
    },
    tabButtonPicto: {
        height:15,
        width:15,
        marginRight:5
    },
    buttonBorder: {
        alignSelf:'center',
        height:'70%',
        width:1,
        backgroundColor:'#cccccc'
    }
});
export default class TimeLine extends Component {
    constructor(props) {
        super(props);

    }
    render() {
          return (
            <View contentContainerStyle={[styles.greyColorBG]}>
                <View style={timeLineStyle.tabContainer}>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPres={() => {}}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain' source={require('../assets/img/picto/menu/actions/assist.png')} />
                        <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder}></View>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPres={() => {}}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain' source={require('../assets/img/picto/menu/actions/goal.png')} />
                        <Text style={timeLineStyle.tabButtonText}>But</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder}></View>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPres={() => {}}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain' source={require('../assets/img/picto/menu/actions/post.png')} />
                        <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding:10, paddingLeft: 5, paddingRight:5}}>
                    <Post></Post>
                </ScrollView>
            </View>
        )
    }
}
