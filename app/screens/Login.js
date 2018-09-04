import React, {Component} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Animated, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import orientation from '../config/orientation';
import {GLOBAL_STYLE, IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from '../assets/css/global';
import CustomInput from '../components/CustomInput';
import {connect} from 'react-redux';
import {userActions} from "../_actions/user";
import utils from '../config/utils';
import {_errorAlert} from "../_utils/alert";
import {NavigationActions} from "react-navigation";
import ActionCreators from "../_actions/index";
import {bindActionCreators} from "redux";


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
    }

    onChange = (state, newvalue) => {
        this.setState({[state]: newvalue})
    }

    componentWillReceiveProps = (nextProps) => {
        const {navigate} = this.props.navigation;

        if (nextProps.userFetched && nextProps.currentUser) {
            utils.registerForPushNotificationsAsync(nextProps.currentUser.id);
            navigate("Main", {});
        }
    }

    loginIn = () => {
        this.props.navigation.dispatch(userActions.login(this.state.email, this.state.password));

        console.log(this.props)
        //this.setModalVisible(true);
    }

    navigateSignIn = () => {
        console.log(this.props.navigation)
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'SignUp'}))
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{
                backgroundColor: '#003366', flex: 1,
                alignItems: 'center', justifyContent: 'space-between'
            }}>
                <KeyboardAvoidingView behavior="padding"
                                      style={{
                                          flex: 3,
                                          justifyContent: 'space-between',
                                          marginVertical: 40
                                      }}>
                    <View>
                        <Animated.Image source={require('../assets/img/thestadium/logo-blanc.png')}
                                        style={[GLOBAL_STYLE.middleLogo, {width: window.width / 1.5}]}/>
                        <Text style={GLOBAL_STYLE.slogant}>Partagez et suivez l'actualitée du foot amateur</Text>
                    </View>
                    <View>
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
                        <TouchableOpacity
                            style={[GLOBAL_STYLE.loginButton, {backgroundColor: this.state.email && this.state.password ? '#ffffff' : '#cccccc'}]}
                            onPress={() => {
                                this.loginIn()
                            }}>
                            <Text>Connexion</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{marginBottom: 20, color: 'white'}} onPress={() => this.navigateSignIn()}>Pas encore
                        inscrit ?</Text>
                    <TouchableOpacity onPress={() => this.navigateSignIn()} style={GLOBAL_STYLE.loginButton}>
                        <Text style={GLOBAL_STYLE.loginText}>Démarrer l'inscription</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        userFetched: state.currentUser.fetched,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);