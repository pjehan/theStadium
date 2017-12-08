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
    }
});
let media = [{
    url :'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'
}];
export default class Post extends Component {
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
         <View style={PostStyle.container}>
             <OwnerHeader Owner={'Cheunn Nourry'} postDate={new Date(2017, 10, 30, 23-5, 0, 0, 0)}></OwnerHeader>
            
             <Content type={'simple'} content={'oui la vie des ouf'} media={media}></Content>

            <UserActions></UserActions>
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
