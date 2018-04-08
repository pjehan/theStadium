import React, {Component} from 'react';

import {View,AsyncStorage,StyleSheet,Button,DatePickerAndroid,Text,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {GLOBAL_STYLE} from '../../assets/css/global';
import CustomInput from '../../components/CustomInput';
import {connect} from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import {NavigationActions}from "react-navigation";
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
        };
        this.onChangeInfos = this.onChangeInfos.bind(this);

        this._filterClub = this._filterClub.bind(this);
    }
    onChangeInfos(state, newvalue) {
        this.props.user[state] = newvalue;
      this.setState({[state]: newvalue});
    }
    componentDidMount() {
        AsyncStorage.getItem('clubList').then(
            value => {
                this.setState({clubList: JSON.parse(value)});
                console.log(this.state, '*********************************')
                this.forceUpdate();
            });
    }
    _setClub(item) {
        this.setState({
            clubQuery: item.name,
            club: item.id,
            hideClub: true,
        });
        this.props.user.club = item.id;
        this.props.navigation.setParams({
            teamList: item.teams
        });
        this.props.navigation.dispatch(NavigationActions.setParams({
            params:{
                coach:true,
                teamList: item.teams
            },
            key: "CoachInfos"
        }))
    }
    _filterClub(query, dataSource) {
        console.log(dataSource)
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if(data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
    }
    render() {
      let Coach = null;
        const {clubQuery, clubList} = this.state;
        const clubData = this._filterClub(clubQuery, clubList);
      if(this.props.navigation.state.params.coach) {
        Coach = <View style={[{height: 40, width: '65%'}]}>
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                data={clubData}
                defaultValue={clubQuery}
                placeholder={'Nom de votre Club'}
                onChangeText={text => this.setState({clubQuery: text})}
                hideResults={this.state.hideClub}
                renderItem={item => (

                    <TouchableOpacity onPress={() => this._setClub(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
      }
        return (
            <View style={{flex: 7, backgroundColor:'white',justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30}}>

                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Création de votre profil</Text>
                    <Text style={[GLOBAL_STYLE.miniDescription]}>
                        Ajoutez de vraies informations pour vous permettre déchanger avec les joueurs et les clubs
                    </Text>
                </View>

                <KeyboardAvoidingView
                    style={{flex:3, justifyContent: 'space-around', alignItems:'center'}}
                    behavior="padding">
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
                </KeyboardAvoidingView>
            </View>
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