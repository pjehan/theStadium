import React, {Component} from 'react';
import {Button, Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';

class Congratz extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{backgroundColor:'#ffffff',flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{height: '50%', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Image style={[GLOBAL_STYLE.middleLogo]}
                           source={require('../../assets/img/thestadium/logo-bleu1.png')}/>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: '#003366'}}>Félicitation !</Text>
                        <Text style={{fontWeight: 'bold', color: '#003366'}}>Vous entrez dans la communauté du
                            football</Text>
                    </View>
                    <TouchableOpacity style={{borderRadius: 5, padding: 10, backgroundColor: '#003366'}}
                                      onPress={() => {
                                          navigate('Main');
                                      }}>
                        <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Accéder à mon Stadium</Text>
                    </TouchableOpacity>
                </View>
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