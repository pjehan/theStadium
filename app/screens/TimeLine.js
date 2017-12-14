import React, { Component } from 'react';
import { StyleSheet, Image,Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../assets/css/global';
import Post from '../components/TimeLine/Post';
import PostModal from '../components/TimeLine/Post/PostModal';

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
    },
    singlePost: {
        marginBottom: 200
    },profilePic: {
        width: 45,
        height: 45,
        borderRadius:45,
        marginRight: 5
    },
    text: {
        color:'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
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
        type:'assists',
        assist: 1,
        postDate: new Date(2017, 11, 9, 8, 2, 5),
        post_likes: 1,
        post_comments: 202,
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
        post_likes: 4,
        post_comments: 220,
        post_shares: 5
    },
];
let Modal = null;
export default class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible : false,
            modalType:'',
        }
        this.onToggleModal = this.onToggleModal.bind(this)
    }
    onToggleModal(visible, type) {
        this.setState({modalVisible: visible});
        this.setState({modalType: type});
    }

    render() {
          return (
            <View contentContainerStyle={[styles.greyColorBG]}>
                <PostModal owner={ {lastName:'Segara',
                    firstName: 'Sophie'}} type={this.state.modalType} visible={this.state.modalVisible}
                           toggleModal={(visible, type)=> {
                               this.onToggleModal(visible, type)
                           }}/>
                <View style={timeLineStyle.tabContainer}>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {this.onToggleModal(true, 'assists')}}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain' source={require('../assets/img/picto/menu/actions/assist.png')} />
                        <Text style={timeLineStyle.tabButtonText}>Passe dé.</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder}></View>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {this.onToggleModal(true, 'goals')}}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain' source={require('../assets/img/picto/menu/actions/goal.png')} />
                        <Text style={timeLineStyle.tabButtonText}>But</Text>
                    </TouchableOpacity>
                    <View style={timeLineStyle.buttonBorder}></View>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPress={() => {this.onToggleModal(true, 'simple')}}>
                        <Image style={timeLineStyle.tabButtonPicto} resizeMode='contain' source={require('../assets/img/picto/menu/actions/post.png')} />
                        <Text style={timeLineStyle.tabButtonText}>Publier</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{padding:10, paddingLeft: 5, paddingRight:5, paddingBottom:35}}>
                    <Post style={timeLineStyle.singlePost} post={PostList[1]}></Post>
                    <Post style={timeLineStyle.singlePost} post={PostList[0]}></Post>
                    <Post style={timeLineStyle.singlePost} post={PostList[2]}></Post>
                    {PostList.map((post,index) => {
                        <Post key={index} post={post}></Post>
                    })}
                </ScrollView>
            </View>
        )
    }
}
