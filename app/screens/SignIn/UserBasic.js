import React, {Component} from 'react';

import {View,StyleSheet,Button,DatePickerAndroid,Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
class userBasic extends Component {

    constructor(props){
        super(props);
        this.state = {
          lastname: '',
          firstname: '',
          date: '',
          birthdate: '',
        };
        this.onChangeInfos = this.onChangeInfos.bind(this)
    }
    onChangeInfos(state, newvalue) {
        this.props.user[state] = newvalue;
      this.setState({[state]: newvalue});
    }


    render() {
      let Coach = null;
      if(this.props.navigation.state.params.coach) {
        Coach = <CustomInput
        container={''}
        placeholder={'Nom du club'}
        input={GLOBAL_STYLE.input}
        state={'club'}
        textColor={'#333333'}
        borderColor={'transparent'}
        backgroundColor={'#eeeeee'}
        onChangeParent={() => {(state,newvalue) => {this.onChangeInfos(state, newvalue)}}}/>
      }
        return (
            <View style={{flex: 7, backgroundColor:'white',justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Création de votre profil</Text>
                    <Text style={[GLOBAL_STYLE.miniDescription]}>
                        Ajoutez de vraies informations pour vous permettre déchanger avec les joueurs et les clubs
                    </Text>
                </View>

                <KeyboardAvoidingView
                    style={{flex:3, justifyContent: 'space-around', alignItems:'center'}}
                    behavior="padding">
                    <CustomInput
                        container={''}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={'Nom'}
                        input={GLOBAL_STYLE.input}
                        state={'lastname'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                        container={''}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={'Prénom'}
                        input={GLOBAL_STYLE.input}
                        state={'firstname'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                    type={'date'}
                    container={''}
                    textColor={'#333333'}
                    borderColor={'transparent'}
                    backgroundColor={'#eeeeee'}
                    placeholder={'Date de naissance'}
                    state={'birthdate'}
                    input={GLOBAL_STYLE.input}
                    format={'date'}
                    onChangeParent={(state,newvalue) => {this.onChangeInfos(state,newvalue)}}
                    />
                    {Coach}
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};
export default connect(mapStateToProps)(userBasic);