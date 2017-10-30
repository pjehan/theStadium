import React, {Component} from 'react';

import { Text, View, Image, TextInput, Keyboard } from 'react-native';
export default class CustomInput extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(test) {
      this.props.onChangeParent(this.props.state, test)
    }

    render() {
        return(
            <View style={this.props.container}>
                <TextInput
                    onChangeText={(value) => this.onChange(value)}
                    placeholder={this.props.placeholder}
                    style={this.props.input}
                    securityTextEntry={this.props.security}
                    underlineColorAndroid="transparent"
                />
            </View>
        )
    }
}
