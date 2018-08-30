import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, Text, View,} from 'react-native';
import {GLOBAL_STYLE} from "../../assets/css/global";

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
                <View style={[GLOBAL_STYLE.mainColorBG, GLOBAL_STYLE.justifyMiddle]}>
                    <ActivityIndicator color="#ffffff" size="large"/>
                    <Text style={{color: '#ffffff', fontSize: 16}}>Connexion</Text>
                </View>
        );
    }
}