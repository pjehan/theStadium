import React, {Component} from 'react';

import {View,AsyncStorage,StyleSheet,Button,DatePickerAndroid,ScrollView,Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import {NavigationActions}from "react-navigation";
import {PlayerSignInStack} from "../../routes/router";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view/lib/KeyboardAwareScrollView";
import SelectedTeam from "../../components/renderSelectedTeam/index";
import SearchDropDown from "../../components/SearchDropdown/index";


class userBasic extends Component {

    constructor(props){
        super(props);
        this.state = {
          lastname: '',
          firstname: '',
          date: '',
          birthdate: '',
            clubQuery: '',
            clubList: '',
            club:'',
            visible:false
        };
        this.onChangeInfos = this.onChangeInfos.bind(this);

        this._filterClub = this._filterClub.bind(this);
        this._setClub = this._setClub.bind(this);
    }
    onChangeInfos(state, newvalue) {
        this.props.user[state] = newvalue;
        this.setState({[state]: newvalue});
    }

    componentDidMount() {
        AsyncStorage.getItem('clubList').then(
            value => {
                this.setState({clubList: JSON.parse(value)});
                this.forceUpdate();
            });
    }
    _setClub(item) {
        console.log(item)
        this.setState({
            clubQuery: item.name,
            club: item.id,
            hideClub: true,
        });
        this.props.user.club = item.id;
        this.props.navigation.setParams({
            teamList: item.teams
        });
        console.log(this.props.user)
        this.props.navigation.dispatch(NavigationActions.setParams({
            params:{
                coach:true,
                teamList: item.teams
            },
            key: "CoachInfos"
        }))
    }
    _filterClub(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if(data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
    }


    searchClosed(visible, data) {
        this.setState({visible: visible});

        if (data) {
            this.setState({
                clubQuery: data.club.name,
                club: data,
                team: data,
            });

            this.props.user.club = data.club.id;
            this.props.user.team = data.id;
        }

        this.forceUpdate();
    }
    render() {
      let Coach = null;
        const {clubQuery, clubList} = this.state;
        const clubData = this._filterClub(clubQuery, clubList);
      if(this.props.navigation.state.params.coach) {
        Coach = (<TouchableOpacity onPress={() => {this.setState({visible:true}); this.forceUpdate()}} style={[{width: '100%'}]}>
            <SelectedTeam team={this.state.team} placeholder={'Entrez le nom de votre club'}/>
        </TouchableOpacity>)
      }
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={90}
                style={{flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',backgroundColor:'white', paddingLeft: 30, paddingRight: 30}}
                behavior="padding">
                <SearchDropDown title={'Equipe adverse'} dataList={this.state.clubList} visible={this.state.visible}
                                onModalClose={(visible, data) => this.searchClosed(visible, data)}/>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Création de votre profil</Text>
                    <Text style={[GLOBAL_STYLE.miniDescription]}>
                        Ajoutez de vraies informations pour vous permettre d'échanger avec les joueurs et les clubs
                    </Text>
                </View>

                <View
                    style={{flex:2, justifyContent: 'space-around', alignItems:'center'}}>
                    <CustomInput
                        container={''}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={'Nom'}
                        input={GLOBAL_STYLE.input}
                        state={'lastname'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                        container={''}
                        textColor={'#333333'}
                        borderColor={'transparent'}
                        backgroundColor={'#eeeeee'}
                        placeholder={'Prénom'}
                        input={GLOBAL_STYLE.input}
                        state={'firstname'}
                        onChangeParent={(state,newvalue) => {this.onChangeInfos(state, newvalue)}}
                    />
                    <CustomInput
                    type={'date'}
                    container={''}
                    textColor={'#333333'}
                    borderColor={'transparent'}
                    backgroundColor={'#eeeeee'}
                    placeholder={'Date de naissance'}
                    state={'birthdate'}
                    input={GLOBAL_STYLE.input}
                    format={'date'}
                    onChangeParent={(state,newvalue) => {this.onChangeInfos(state,newvalue)}}
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
export default connect(mapStateToProps)(userBasic);
const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        borderWidth:0,
        height:60
    },
    inputContainer: {
        backgroundColor: '#cccccc',
        borderWidth:0,
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