import React, {Component} from 'react';

import {
    Text,
    View,
    TextInput,
    Keyboard,
    DatePickerAndroid,
    TouchableOpacity,
    Platform,
    TimePickerAndroid
} from 'react-native';

import { Icon } from 'react-native-elements';

import Moment from 'moment';

const date = new Date();
const FORMATS = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm',
    'time': 'HH:mm',
    'dateDisplaying': 'DD/MM/YYYY',
};

/**
 * This Component takes multiple params
 *
 * container :  style of the input's container
 * placeholder : placeholder of the input
 * input : style of the input
 * state : Name of the state to modify on the parents component;
 * borderColor: Color of the border$
 * textColor: color of the text and the placeholder
 * backgroundColor: color of the background
 * type : type of the input [date, text, etc]
 * format : if the input is of type date, it is the format of the date (c.f. FORMATS const)
 *
 */
let time;
export default class CustomInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: date,
            displayDate: '',
        };
        if(!this.props.borderColor) {
          this.props.borderColor = 'transparent'
        }
        this.onChange = this.onChange.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.onDatePicked = this.onDatePicked.bind(this);
        this.getDateString = this.getDateString.bind(this);
        this.openTimePicker = this.openTimePicker.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
    }
    onChangeSize(size){
        this.props.onChangeSizeParent(size)
    }
    onChange(value) {
        this.props.onChangeParent(this.props.state, value)
    }

    onTriggeredAction() {
        this.props.onTriggeredAction();
    }
    openDatePicker() {
        if (Platform.OS === 'ios') {
            // do ios job
        } else {
            DatePickerAndroid.open({
                date: this.state.date,
                mode: 'spinner',
                maxDate: Moment().subtract(13, 'years').toDate()
            }).then(this.onDatePicked);
        }
    }

    onDatePicked({action, year, month, day}) {
        Keyboard.dismiss();
        if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
                date: new Date(year, month, day)
            });
            this.onChange(this.getDateString(this.state.date, FORMATS[this.props.format]));
        }
    }

    openTimePicker() {
        if (Platform.OS === 'ios') {
            // do ios job
        } else {
            TimePickerAndroid.open({
                is24Hour:true,
                mode: 'spinner'
            }).then(this.onTimePicked);
        }
    }

    onTimePicked({action, hour, minute}) {
        Keyboard.dismiss();
        if (action !== TimePickerAndroid.dismissedAction) {
            time = hour + "h" + minute;
            this.onChange(time);
        }
    }

    getDateString(date, format) {
        let displayDate = Moment(date).format(FORMATS['dateDisplaying']);
        this.setState({displayDate: displayDate});

        return Moment(date).format(format);
    }

    render() {
        let Action;
        let Input;
        let Description;
        let datePlaceholder = this.state.displayDate ? this.state.displayDate : this.props.placeholder;
        if(this.props.action) {
           Action = (<Icon color={this.props.actionColor ? this.props.actionColor : '#003366'} name={this.props.action} style={{marginHorizontal:5}} onPress={() => this.onTriggeredAction()} />)
        }
        if(this.props.description) {
            Description = (<Text style={{color:this.props.descriptionColor ? this.props.descriptionColor :'#c8c8c8',fontSize:12,width: 300}}>{this.props.description}</Text>)
        }
        if (this.props.type === 'date') {
            Input = <TouchableOpacity
                onPress={() => this.openDatePicker()}
                style={[this.props.input, {backgroundColor: this.props.backgroundColor}]}
            ><Text>{datePlaceholder}</Text><Icon name={'expand-more'} size={30} color='#333333' />
            </TouchableOpacity>
        } else if(this.props.type === 'time'){
            Input = <TouchableOpacity
                onPress={() => this.openTimePicker()}
                style={[this.props.input, {backgroundColor: this.props.backgroundColor}]}
            ><Text>{time}</Text><Icon name={'expand-more'} size={30} color='#333333' />
            </TouchableOpacity>
        }
        else {
            Input = <TextInput
                {...this.props}
                multiline={this.props.multiple}
                placeholderTextColor={this.props.placeholderTextColor || this.props.textColor}
                onChangeText={(value) => this.onChange(value)}
                placeholder={this.props.placeholder}
                onContentSizeChange={(event) => {
                   this.props.onChangeSizeParent ? this.onChangeSize(event.nativeEvent.contentSize.height) : null
                }}
                style={[this.props.input, {backgroundColor: this.props.backgroundColor, borderColor: this.props.borderColor,color: this.props.textColor}]}
                secureTextEntry={this.props.security}
                keyboardType={this.props.keyboardType}
                underlineColorAndroid="transparent"
            />

        }
        return (
            <View style={[this.props.container, this.props.inputContainer]}>
                {Input}
                {Action}
                <View>
                    {Description}
                </View>
            </View>
        )
    }
}
