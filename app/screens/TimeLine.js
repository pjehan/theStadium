import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { styles } from '../assets/css/global';
import { StyleSheet } from 'react-native';

export const timeLineStyle = StyleSheet.create({
    tabContainer: {
        justifyContent: 'space-between',
        backgroundColor:'#ffffff',
        flexDirection:'row',
        width: '100%',
        height: 50
    },
    tabButton: {
        backgroundColor: 'white',
        flex:1,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
});
export default class TimeLine extends Component {
    constructor(props) {
        super(props);

    }
    render() {
          return (
            <ScrollView contentContainerStyle={[styles.greyColorBG]}>
                <View style={timeLineStyle.tabContainer}>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPres={() => {}}>
                        <Text>Passe dé.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPres={() => {}}>
                        <Text>But</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={timeLineStyle.tabButton} onPres={() => {}}>
                        <Text>Publier</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
