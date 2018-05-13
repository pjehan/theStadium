import React, {Component} from 'react';
import {Button, Text, View, StatusBar, Image, TouchableOpacity, Modal} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';

class Congratz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{backgroundColor: '#ffffff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(false)}
                >
                    <View style={[GLOBAL_STYLE.mainColorBG, GLOBAL_STYLE.justifyMiddle]}>
                        <ActivityIndicator color="#ffffff" size="large"/>
                        <Text style={{color: '#ffffff', fontSize: 16}}>Connexion</Text>
                    </View>
                </Modal>
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
                                          this.props.dispatch(userActions.login(this.props.user.email, this.props.user.password));
                                          this.setModalVisible(true);
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