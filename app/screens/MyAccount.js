import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {GLOBAL_STYLE} from '../assets/css/global';
import CustomInput from '../components/CustomInput';
import {connect} from 'react-redux';
import Header from "../components/presentational/layout/Header";

class MyAccount extends Component {
    constructor(props) {
        super(props);
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue});
    }

    _save(){
        console.log('oui')
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View>
                <Header action={true} actionText={'Enregistrer'} actionTriggered={() => this._save() } navigation={this.props.navigation} headerText={'Réglages'} backIcon={true}/>
                <ScrollView
                    contentContainerStyle={[GLOBAL_STYLE.mainColorBG, GLOBAL_STYLE.justifyStretch, {paddingTop:0,backgroundColor: '#ffffff'}]}>
                    <View style={{width:'100%',paddingHorizontal:10}}>
                        <Text style={{paddingVertical:10}}>{'Paramètres de connexion'.toUpperCase()}</Text>
                        <View style={{height:1,backgroundColor:'#000000'}}/>
                        <TouchableOpacity>
                            <CustomInput
                                onChangeParent={(state, newvalue) => this.onChange(state, newvalue)}
                                textColor={'#333333'}
                                security={true}
                                input={{width: 50}}
                                container={{justifyContent: 'flex-end'}}
                                placeholder={'Modifier votre mot de passe'}
                                state={'password'}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        userFetched: state.currentUser.fetched,
    };
};
export default connect(mapStateToProps)(MyAccount);