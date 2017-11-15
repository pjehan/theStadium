import React, {Component} from 'react';

import { Text, View, Image, TextInput, Keyboard, DatePickerAndroid,TouchableOpacity } from 'react-native';
export default class CustomInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
          date = '';
        }
        this.onChange = this.onChange.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.onDatePicked = this.onDatePicked.bind(this);
    }

    onChange(value) {
      this.props.onChangeParent(this.props.state, value)
    }
    openDatePicker(){
      {
        try {
            DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date()
            }).then(
            this.onDatePicked());
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }
  }
    onDatePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
    } else {
     console.log('non')
    }
  }
    render() {
      var Input;

      if(this.props.type == 'date') {
        Input = <TouchableOpacity
        onPress={() => this.openDatePicker()}
        style={this.props.input}
        ><Text>{this.props.placeholder}</Text></TouchableOpacity>
      } else {
        Input =  <TextInput
            {...this.props}
            onChangeText={(value) => this.onChange(value)}
            placeholder={this.props.placeholder}
            style={this.props.input}
            secureTextEntry={this.props.security}
            underlineColorAndroid="transparent"
        />
      }
        return(
            <View style={[this.props.container,this.props.inputContainer]}>
                {Input}
                <Text style={{width: 300}}>{this.props.description}</Text>
            </View>
        )
    }
}
