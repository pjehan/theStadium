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
        alignItems: 'center',
        justifyContent: 'center',
        height:50
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
                <Text style={PostStyle.text}>Je mappelle bibi</Text>
            </View>
            <View style={PostStyle.userAction}>
              <TouchableOpacity>
              <View style={{alignItems:'center'}}>
                <Image style={{height:25, width:25}} source={require('../../../assets/img/picto/actualite/like.png')}/>
                <Text>32</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{alignItems:'center'}}>
                  <Image style={{height:25, width:40,marginLeft:20,marginRight:20}} source={require('../../../assets/img/picto/actualite/comment.png')}/>
                  <Text>50</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{alignItems:'center'}}>
                  <Image style={{height:25, width:25}} source={require('../../../assets/img/picto/actualite/partage.png')}/>
                  <Text>699</Text>
                </View>
              </TouchableOpacity>
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
