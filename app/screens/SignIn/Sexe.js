import React, {Component} from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import { GLOBAL_STYLE } from '../../assets/css/global';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';

class Sexe extends Component {

        sexeSelected(route,sexe) {

            const {navigate} = this.props.navigation;
            const USER = this.props.user;
            USER.sexe = sexe;
            this.props.dispatch(userActions.addInfos(USER));
            navigate(route);
        }
    render() {
        return (
            <View style={{flex: 6, justifyContent:'flex-start', paddingLeft:60, paddingRight:60}}>
                <View style={{flex:2, justifyContent:'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Bienvenue</Text>
                    <Text style={[GLOBAL_STYLE.description, GLOBAL_STYLE.mainColor]}>De quel sexe êtes-vous ?</Text>
                </View>
                <View  style={{flex:3, justifyContent:'space-around'}}>
                    <Button
                        onPress={() => {this.sexeSelected('SignIn',1);}}
                        title="Homme"
                        color="#003366"
                    />
                    <Button
                        onPress={() => {this.sexeSelected('SignIn',2);}}
                        title="Femme"
                        color="#003366"
                    />

                    <Button
                        onPress={() => {this.sexeSelected('SignIn',3);}}
                        title="Autre"
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
export default connect(mapStateToProps)(Sexe);