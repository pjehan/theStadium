import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import UserActions from './UserActions';
import OwnerHeader from './OwnerHeader';
import Content from './Content';
import { styles } from '../../../assets/css/global';
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
    },
    assist_and_goals: {
        backgroundColor: '#00A65B',
    }
});
export default class Post extends Component {
    constructor(props) {
      super(props);
      this.state = {
        post: this.props.post
      }
      console.log(this.state.post)
    }
    render() {
        return (
         <View style={PostStyle.container}>
             <OwnerHeader Owner={this.state.post.owner.firstName + ' ' + this.state.post.owner.lastName} postDate={this.state.post.postDate}></OwnerHeader>
            
             <Content {...this.state.post}></Content>

            <UserActions likes={this.state.post.post_likes} shares={this.state.post.post_shares} comments={this.state.post.post_comments}></UserActions>
             <View style={PostStyle.userActionText}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                      <Text style={PostStyle.text}>Jaime</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={[PostStyle.text, {marginLeft: 5,marginRight:5}]}>Commenter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={PostStyle.text}>Partager</Text>
                    </TouchableOpacity>
                 </View>
                 <Text style={PostStyle.text}>Lire les commentaires</Text>
             </View>
         </View>
        )
    }
}
