import React, {Component} from 'react';
import {Button, Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import { GLOBAL_STYLE } from '../../assets/css/global';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';

class Congratz extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Image style={GLOBAL_STYLE.middleLogo} source={require('../../assets/img/thestadium/logo-blanc.png')} />
                <Text>Félicitation !</Text>
                <Text>Vous entrez dans la communauté du football</Text>

                <TouchableOpacity onPress={() => {navigate('Congratz');}}>
                    <Text>Accéder à mon Stadium</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};
export default connect(mapStateToProps)(Congratz);