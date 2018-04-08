import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    AsyncStorage, ScrollView
} from 'react-native';
import Autocomplete from "react-native-autocomplete-input";
import CustomInput from "../../../../CustomInput";
import {GLOBAL_STYLE} from '../../../../../assets/css/global';
export default class Conclusion extends Component {

    constructor(props){
        super(props);

        this.state = {
            height:null,
        }
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue});
    }
    render() {
        return (
            <View style={{backgroundColor:'#ffffff'}}>
                <View style={{backgroundColor: '#e9e9e9', paddingHorizontal: 15, paddingVertical: 10}}>
                    <Text style={{color: '#000000', fontWeight: '600'}}>Conclusion du match</Text>
                </View>
                <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
                    <CustomInput multiple={true}
                                 container={{height:400,justifyContent: 'flex-start',}}
                                 placeholder={'Faîtes une conclusion du match, et décrivez les compétitions à venir'}
                                 input={[{borderWidth:1, padding: 5, marginTop: 10,height: Math.max(50, this.state.height)}]}
                                 placeholderTextColor={'#cccccc'}
                                 state={'conclusion'}
                                 textColor={'#000000'}
                                 borderColor={'#cccccc'}
                                 backgroundColor={'#ffffff'}
                                 onChangeSizeParent={(size)=>{
                                    this.setState({height:size})
                                 }}
                                 onChangeParent={(state, newvalue) => {
                                     this.onChangeInfos(state, newvalue)
                                 }}/>

                </View>
            </View>
        );
    }
}