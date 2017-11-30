import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import UserActions from './UserActions';
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
            <View style={PostStyle.ownerStyle}>
                <Image style={PostStyle.profilePic} source={require('../../../assets/img/TA-Rennes.jpg')}/>
                <View>
                  <Text style={PostStyle.title}>Cheunn Nourry</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={PostStyle.teamBackground}>
                    <Text style={PostStyle.teamText}>U13 DRH</Text>
                  </View>
                  <View style={{height:8, width:8, backgroundColor: '#cccccc', borderRadius: 8, marginLeft:6, marginRight:6}}></View>
                  <View style={{flexDirection: 'row'}}>
                    <Image resizeMode="contain" style={{height:15, width:15}} source={require('../../../assets/img/picto/actualite/picto-time-gris.png')} />
                    <Text style={PostStyle.timeText}>15 min </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{flexDirection: 'row', alignItems:'center', marginLeft: 'auto', marginRight:8}}>
                  <View style={{height:8, width:8, backgroundColor: '#cccccc', borderRadius: 8}}></View>
                  <View style={{height:8, width:8, backgroundColor: '#cccccc', borderRadius: 8, marginLeft:2, marginRight:2}}></View>
                  <View style={{height:8, width:8, backgroundColor: '#cccccc', borderRadius: 8}}></View>
                </TouchableOpacity>
            </View>
            
            <View>
              <Text style={{padding:10, paddingLeft:5, paddingRight:5}}>
                Les jeunes du club ont été entraîné par l'ancien professionel Jonh Bertrand cette après-midi
              </Text>
            </View>

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
