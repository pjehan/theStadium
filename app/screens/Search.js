import {GLOBAL_STYLE} from "../assets/css/global";
import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';

export default class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                <Text>Recherche</Text>
            </View>
        )
    }
}