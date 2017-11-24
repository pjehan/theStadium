import React, { Component } from 'react';
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
import { styles } from '../assets/css/global';
import CustomInput from '../components/CustomInput';

export default class Login extends Component {
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
  loginIn() {
    //fetch to databse
      var {navigate} = this.props.navigation;
    this.setModalVisible(true);
    setTimeout(() => {
        this.setModalVisible(false);
        navigate("TimeLine", {})}
        , 2000)
  }
  render() {

      var {navigate} = this.props.navigation;
    return (
        <ScrollView contentContainerStyle={[styles.mainColorBG, styles.justifyStretch]} >
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
            >
                <View style={[styles.mainColorBG, styles.justifyMiddle]}>
                <ActivityIndicator color="#ffffff" size="large" />
                <Text style={{color: '#ffffff', fontSize: 16}}>Connexion</Text>
                </View>
            </Modal>
            <View >
                <Image style={styles.middleLogo} source={require('../assets/img/logo-blanc.png')} />
                <Text style={styles.slogant}>Partagez et suivez lactualité du foot amateur</Text>
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
              input={styles.input}
              state={'email'}
              security={false}
              onChangeParent={(state,newvalue) => this.onChange(state,newvalue)}
              />
          <CustomInput
                  container={''}
                  textColor={'white'}
                  borderColor={'white'}
                  placeholder={'Votre Mot de Passe'}
                  input={styles.input}
                  security={true}
                  state={'password'}
                  onChangeParent={(state,newvalue) => this.onChange(state,newvalue)}
                  />
                  <TouchableOpacity disabled={(this.state.email && this.state.password ? false : true)}
                                    style={[styles.loginButton, {backgroundColor:this.state.email && this.state.password ? '#ffffff' : '#cccccc'}]}
                                    onPress={() => {this.loginIn()}}>
                    <Text>Connexion</Text>
                  </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
        <View>
          <Text style={{marginBottom: 20, color: 'white'}} onPress={() => navigate("SignIn", {})} >Pas encore inscrit ?</Text>
          <TouchableOpacity onPress={() => navigate("SignIn", {})} style={styles.loginButton} >
            <Text style={styles.loginText}>Démarrer linscription</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    )
  }
};
