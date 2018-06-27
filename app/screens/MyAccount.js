import React, {Component} from 'react';
import {
    Dimensions,
    TouchableOpacity,
    Text,
    View,
    Image,
    TextInput,
    Button,
    KeyboardAvoidingView,
    ScrollView,
    Modal,
    ActivityIndicator
} from 'react-native';
import orientation from '../config/orientation';
import {GLOBAL_STYLE} from '../assets/css/global';
import CustomInput from '../components/CustomInput';
import {connect} from 'react-redux';
import {userActions} from "../_actions/user";
import axios from "axios";
import Expo, {Notifications,Permissions } from 'expo';
import {clubAction} from "../_actions/club";

class MyAccount extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <ScrollView contentContainerStyle={[GLOBAL_STYLE.mainColorBG, GLOBAL_STYLE.justifyStretch]}>
                <View>
                    <Text>Paramètres de connexion</Text>

                </View>
            </ScrollView>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        userFetched: state.currentUser.fetched,
    };
};
export default connect(mapStateToProps)(Login);