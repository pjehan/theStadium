import React, {Component} from 'react';

import { Text, View, Image, TextInput } from 'react-native';
export default class CustomInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={this.props.container}>
                <TextInput
                    defaultValue={'OUi bonjour'}
                    value={this.props.value}
                    style={this.props.input}
                    underlineColorAndroid="transparent"
                />
            </View>
        )
    }
}