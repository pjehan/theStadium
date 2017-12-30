import React, { Component } from 'react';
import { StyleSheet, Image,Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../assets/css/global';
import Post from '../components/TimeLine/Post';
import PostModal from '../components/TimeLine/Post/PostModal';
import { connect } from 'react-redux';
import { postActions } from '../_actions';
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

let PostList = [];
let Modal = null;
export default class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible : false,
            modalType:'',
        };
        this.onToggleModal = this.onToggleModal.bind(this)
    }
    componentWillMount() {
        console.log(this.props.dispatch(postActions.getAll()))
    }
    onToggleModal(visible, type) {
        this.setState({modalVisible: visible});
        this.setState({modalType: type});
        console.log('oui')
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

                    {PostList.map((post,index) => {
                        <Post style={timeLineStyle.singlePost} key={index} post={post}></Post>
                    })}
                </ScrollView>
            </View>
        )
    }
}
