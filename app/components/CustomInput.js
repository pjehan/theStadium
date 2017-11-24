import React, {Component} from 'react';

import { Text, View, Image, TextInput, Keyboard } from 'react-native';
export default class CustomInput extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
      this.props.onChangeParent(this.props.state, value)
    }

    render() {
        return(
            <View style={[this.props.container,this.props.inputContainer]}>
                <TextInput
                    onChangeText={(value) => this.onChange(value)}
                    placeholder={this.props.placeholder}
                    style={this.props.input}
                    secureTextEntry={this.props.security}
                    underlineColorAndroid="transparent"
                />
                <Text style={{width: 300}}>{this.props.description}</Text>
            </View>
        )
    }
}
