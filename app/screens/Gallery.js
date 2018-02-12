import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';


export default class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {width} = Dimensions.get('window');
        return (
            <View style={{flexDirection:'row',backgroundColor:'#ffffff'}}>
                <View style={{height:width/4, width:width/4,  marginRight:2, backgroundColor:'#000000'}} ><Text>oui</Text></View>
                <Image style={{height:width/4, width:width/4,  marginRight:2}} resizeMode={'cover'} source={require('../assets/img/TA-Rennes.jpg')}/>
                <Image style={{height:width/4, width:width/4, marginRight:2}} resizeMode={'cover'} source={require('../assets/img/TA-Rennes.jpg')}/>
                <Image style={{height:width/4, width:width/4, marginRight:2}} resizeMode={'cover'} source={require('../assets/img/TA-Rennes.jpg')}/>

            </View>
        )
    }
};
