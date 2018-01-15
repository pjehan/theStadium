import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text>Profil</Text>
                    <Icon style={{position: 'absolute', right: 0}}
                          color='white'
                          size={40}
                          name={'chevron-right'}
                          onPress={() => this.props.navigation.goBack(null)}/>
                </TouchableOpacity>
            </View>
        )
    }
}
