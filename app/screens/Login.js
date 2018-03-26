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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            databse: '',
            orientation: orientation.isPortrait() ? 'portrait' : 'landscape',
            devicetype: orientation.isTablet() ? 'tablet' : 'phone',
            modalVisible: false,
        };
        this.setModalVisible = this.setModalVisible.bind(this);
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: orientation.isPortrait() ? 'portrait' : 'landscape'
            });
        })
    }

    onChange(state, newvalue) {
        this.setState({[state]: newvalue})
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentWillReceiveProps(nextProps) {
        const {navigate} = this.props.navigation;
        if (nextProps.userFetched && nextProps.currentUser) {
            this.setModalVisible(false);
            navigate("TimeLine", {});
        } else {
            this.setModalVisible(false);
        }
    }

    loginIn() {
        //fetch to databse
        this.props.dispatch(userActions.login(this.state.email, this.state.password));
        this.setModalVisible(true);

    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <ScrollView contentContainerStyle={[GLOBAL_STYLE.mainColorBG, GLOBAL_STYLE.justifyStretch]}>
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
                <View>
                    <Image style={GLOBAL_STYLE.middleLogo} source={require('../assets/img/thestadium/logo-blanc.png')}/>
                    <Text style={GLOBAL_STYLE.slogant}>Partagez et suivez lactualité du foot amateur</Text>
                </View>
                <KeyboardAvoidingView
                    behavior="padding">
                    {alert}
                    <View>
                        <Text>{this.state.databse}</Text>
                        <CustomInput
                            container={''}
                            placeholder={'Votre Identifiant'}
                            textColor={'white'}
                            borderColor={'white'}
                            input={GLOBAL_STYLE.input}
                            state={'email'}
                            security={false}
                            onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                        />
                        <CustomInput
                            container={''}
                            textColor={'white'}
                            borderColor={'white'}
                            placeholder={'Votre Mot de Passe'}
                            input={GLOBAL_STYLE.input}
                            security={true}
                            state={'password'}
                            onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                        />
                        <TouchableOpacity disabled={(this.state.email && this.state.password ? false : true)}
                                          style={[GLOBAL_STYLE.loginButton, {backgroundColor: this.state.email && this.state.password ? '#ffffff' : '#cccccc'}]}
                                          onPress={() => {
                                              this.loginIn()
                                          }}>
                            <Text>Connexion</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
                <View>
                    <Text style={{marginBottom: 20, color: 'white'}} onPress={() => navigate("SignIn", {})}>Pas encore
                        inscrit ?</Text>
                    <TouchableOpacity onPress={() => navigate("SignIn", {})} style={GLOBAL_STYLE.loginButton}>
                        <Text style={GLOBAL_STYLE.loginText}>Démarrer linscription</Text>
                    </TouchableOpacity>
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