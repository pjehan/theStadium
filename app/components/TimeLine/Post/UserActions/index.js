import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../../../../assets/css/global';
import { StyleSheet, Image } from 'react-native';
const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width:'100%',
        paddingTop:5,
        paddingBottom: 5
    },
    profilePic: {
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
    userAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10
    },
    ownerStyle: {
        flexDirection: 'row',
        padding:5,
    },
    userActionText: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:10
    },
    actionText: {
      fontSize: 12
    },
    teamText: {
      color: "white",
      fontSize:12
    },
    teamBackground: {
      backgroundColor: '#003366', 
      padding: 10,
      paddingTop:2,
      paddingBottom:2
    },
    timeText: {
      fontSize:12,
      color:'#cccccc',
      fontWeight: '500',
      marginLeft:2
    }
});
export default class UserActions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        post_likes: 32,
        post_shares: 12,
        post_comments: 1,
      }
    }
    render() {
        return (
<View style={PostStyle.userAction}>
            <View style={{height:0.5, backgroundColor:'#cccccc', width: '100%'}}></View>
              <TouchableOpacity style={{marginLeft:10}}>
              <View style={{alignItems:'center'}}>
                <Image resizeMode="contain" style={{height:20, width:20}} source={require('../../../../assets/img/picto/actualite/like.png')}/>
                <Text style={PostStyle.actionText}>{this.state.post_likes}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{marginLeft:20,marginRight:20}}>
                <View style={{alignItems:'center'}}>
                  <Image resizeMode="contain" style={{height:15, width:20}} source={require('../../../../assets/img/picto/actualite/comment.png')}/>
                  <Text style={PostStyle.actionText}>{this.state.post_comments}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{marginRight:10}}>
                  <View style={{alignItems:'center'}}>
                  <Image resizeMode="contain" style={{height:15, width:15}} source={require('../../../../assets/img/picto/actualite/partage.png')}/>
                  <Text style={PostStyle.actionText}>{this.state.post_shares}</Text>
                </View>
              </TouchableOpacity>
              <View style={{height:0.5, backgroundColor:'#cccccc', width: '100%'}}></View>
            </View>
            )
          }
        }