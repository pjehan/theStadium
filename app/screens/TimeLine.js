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

let PostList= [
    {
        owner: {
            lastName: 'Maradou',
            firstName: 'Pierre',
            profilePic: '',
            sex: 'male',
            team: ''
        },
        type:'simple',
        media:[{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}],
        content: 'Bonjour je suis zinedine zidanisme',
        postDate: new Date(),
        post_likes: 42,
        post_comments: 10,
        post_shares: 1
    },
    {
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: ''
        },
        type:'goals',
        goals: 5,
        postDate: new Date(2017, 11, 9, 10, 2, 5),
        post_likes: 40,
        post_comments: 20,
        post_shares: 5
    },
    {
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: ''
        },
        type:'assist',
        assist: 1,
        postDate: new Date(2017, 11, 9, 8, 2, 5),
        post_likes: 40,
        post_comments: 20,
        post_shares: 5
    },
    {
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: 'Senior FD3'
        },
        type:'simple',
        content:'Jaime la teub très très fort',
        media:[{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'},{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}],
        postDate: new Date(2017, 11, 8, 10, 2, 5),
        post_likes: 40,
        post_comments: 20,
        post_shares: 5
    },
];

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
                    <Post post={PostList[1]}></Post>
                    {PostList.map((post,index) => {
                        <Post key={index} post={post}></Post>
                    })}
                </ScrollView>
            </View>
        )
    }
}
