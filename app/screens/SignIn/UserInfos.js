import React, {Component} from 'react';
import {
    View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, Picker, Modal,
    ActivityIndicator
} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
import Autocomplete from "react-native-autocomplete-input";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view/lib/KeyboardAwareScrollView";

const style = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: 48,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});

class PlayerInfos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            teamQuery: '',
            team: '',
            password: null,
            passwordConfirm: null,
        };
        this.onChangeInfos = this.onChangeInfos.bind(this)
    }

    onChangeInfos(state, newvalue) {
        this.props.user[state] = newvalue;
        this.setState({[state]: newvalue});

    }

    componentWillReceiveProps(nextProps) {
        this.forceUpdate();
        const {navigate} = this.props.navigation;

        if (!nextProps.user.fetching && nextProps.user && nextProps.user.done && !nextProps.user.error) {
            navigate('Congratz');
        } else {
            console.log('efafaefeafae')
        }
    }

    _filterTeam(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if (data) {
            return data.filter(data => data.category.label.search(regex) >= 0);
        }
    }

    _setTeam(item) {
        this.setState({team: item});
        this.props.user.team = item
    }

    _checkPasswordString(string){

        if(string) {
            return !string.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/);
        }

    }
    render() {
        const teamList = this.props.navigation.state.params.teamList ? this.props.navigation.state.params.teamList : null;
        const {teamQuery} = this.state;
        const teamData = this._filterTeam(teamQuery, teamList);
        let Coach = null;
        let Fan = null;
        if (this.props.navigation.state.params.coach && teamList) {
            Coach = <View>

                    <View style={{backgroundColor: '#eeeeee'}}>
                        <Picker style={GLOBAL_STYLE.input}
                                prompt="Equipe en charge"
                                selectedValue={this.state.team}
                                onValueChange={itemValue => this._setTeam(itemValue)}>
                            {teamList.map((i, index) => (
                                <Picker.Item key={index} label={i.category.label + ' ' + i.division.label}
                                             value={i.id}/>
                            ))}
                        </Picker>
                    </View>
                </View>;
        }
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={90}
                style={{flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',backgroundColor:'white', paddingLeft: 30, paddingRight: 30}}
                behavior="padding">
                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={!this.props.user.done && this.props.user.fetching}
                    onRequestClose={() => {
                        console.log('close modal')
                    }}>
                    <View style={STYLE.modalBackground}>
                        <View style={STYLE.activityIndicatorWrapper}>
                            <ActivityIndicator
                                size={'large'}/>
                            <Text>Enregistrement en cours</Text>
                        </View>
                    </View>
                </Modal>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Création de votre profil</Text>
                    <Text style={[GLOBAL_STYLE.miniDescription]}>
                        Ajoutez de vraies informations pour vous permettre d'échanger avec les joueurs et les clubs
                    </Text>
                </View>

                <View
                    style={{flex: 2, justifyContent: 'space-between', alignItems: 'center'}}
                    behavior="padding">
                    <CustomInput
                        container={''}
                        placeholder={'Adresse e-mail'}
                        input={GLOBAL_STYLE.input}
                        state={'email'}
                        textColor={'#333333'}
                        borderColor={ this.state.email && !this.state.email.includes('@') ? "#ff0000": 'transparent'}
                        backgroundColor={'#eeeeee'}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}
                        description={this.state.email && !this.state.email.includes('@')? 'Veuillez rentrer une addresse e-mail valide' : '' }
                    />
                    <CustomInput
                        container={''}
                        placeholder={'Mot de passe'}
                        input={GLOBAL_STYLE.input}
                        state={'password'}
                        textColor={'#333333'}
                        descriptionColor={this._checkPasswordString(this.state.password)? "#ff0000": '#cccccc'}
                        borderColor={this._checkPasswordString(this.state.password)? "#ff0000": 'transparent'}
                        backgroundColor={'#eeeeee'}
                        security={false}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}
                        description={this._checkPasswordString(this.state.password) ? 'Votre mot de passe n\'est pas conforme. \nCombinaison de 6 caractères comportant au minimum : 1 lettre majuscule, 1 lettre minuscule ainsi qu\'un chiffre' : 'Combinaison de 6 caractères comportant au minimum : 1 lettre majuscule, 1 lettre minuscule ainsi qu\'un chiffre' }

                    />
                    <CustomInput
                        container={''}
                        placeholder={'Confirmer le mot de passe'}
                        input={[GLOBAL_STYLE.input]}
                        state={'passwordConfirm'}
                        descriptionColor="#ff0000"
                        textColor={'#333333'}
                        borderColor={(this.state.password !== this.state.passwordConfirm) ? "#ff0000": 'transparent'}
                        backgroundColor={'#eeeeee'}
                        security={false}
                        description={this.state.password === this.state.passwordConfirm ? '' : 'Les deux mots de passe ne correspondent pas'}
                        onChangeParent={(state, newvalue) => {
                            this.onChangeInfos(state, newvalue)
                        }}
                    />
                    {Coach}
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.registeringUser
    };
};
export default connect(mapStateToProps)(PlayerInfos);
const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        backgroundColor: '#eeeeee'
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});
const STYLE = StyleSheet.create({
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    tabText: {
        color: '#003366',
        fontWeight: '700'
    },
    even: {
        backgroundColor: '#E7E7E7',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});