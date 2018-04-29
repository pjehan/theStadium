import React, {Component} from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import { GLOBAL_STYLE } from '../../assets/css/global';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';

class SignIn extends Component {

    typeSelected(route,type,params) {
        const USER = this.props.user;
        USER.userType = type;
        this.props.dispatch(userActions.addInfos(USER));
        this.props.navigation.navigate(route,params);
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 6, justifyContent:'flex-start', paddingLeft:60, paddingRight:60}}>
                <View style={{flex:2, justifyContent:'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Bienvenue</Text>
                    <Text style={[GLOBAL_STYLE.description, GLOBAL_STYLE.mainColor]}>Quel profil êtes-vous ?</Text>
                </View>
                <View  style={{flex:3, justifyContent:'space-around'}}>
                    <Button
                        onPress={() => {this.typeSelected('FanSignIn',0,{});}}
                        title="Supporter"
                        color="#003366"
                    />
                    <Button
                        onPress={() => {this.typeSelected('PlayerSignIn',1,{});}}
                        title="Joueur"
                        color="#003366"
                    />
                    <Button
                        onPress={() => {this.typeSelected('CoachSignIn',2,{coach: true});
                        }
                      }
                        title="Entraineur"
                        color="#003366"
                    />
                </View>
                <View style={{flex:1}} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};
export default connect(mapStateToProps)(SignIn);