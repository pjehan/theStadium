import React, {Component} from 'react';
import {Button, Text, View, StatusBar} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import {connect} from 'react-redux';
import ActionCreators from "../../_actions/index";
import {bindActionCreators} from "redux";
import {NavigationActions} from "react-navigation";
import {userActions} from "../../_actions/user";

class Sexe extends Component {

    sexeSelected(sexe) {
        const {dispatch} = this.props.navigation;
        const USER = this.props.user;
        console.log(this.props)
        USER.sexe = sexe;
        dispatch(userActions.addInfos(USER));
        dispatch(NavigationActions.navigate({routeName: 'SignUpUserType'}))
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', paddingLeft: 60, paddingRight: 60}}>
                <View style={{justifyContent: 'center', flex: 2}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Bienvenue</Text>
                    <Text style={[GLOBAL_STYLE.description, GLOBAL_STYLE.mainColor]}>De quel sexe êtes-vous ?</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'space-around'}}>
                    <Button
                        onPress={() => {
                            this.sexeSelected(1);
                        }}
                        title="Homme"
                        color="#003366"
                    />
                    <Button
                        onPress={() => {
                            this.sexeSelected(2);
                        }}
                        title="Femme"
                        color="#003366"
                    />

                    <Button
                        onPress={() => {
                            this.sexeSelected(3);
                        }}
                        title="Autre"
                        color="#003366"
                    />
                </View>
                <View style={{flex:1}} />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sexe);