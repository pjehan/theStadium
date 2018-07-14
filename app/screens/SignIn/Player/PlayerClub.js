import React, {Component} from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {
    View, StyleSheet, AsyncStorage, Text, KeyboardAvoidingView, TouchableOpacity, Picker, Item,
    Modal, ActivityIndicator,Linking
} from 'react-native';
import {GLOBAL_STYLE} from '../../../assets/css/global';
import CustomInput from '../../../components/CustomInput';
import {connect} from "react-redux";
import SearchDropDown from "../../../components/SearchDropdown/index";
import SelectedTeam from "../../../components/renderSelectedTeam/index";

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

const ROLES = [
    {label:"Gardien", value:1},
    {label:"Latéral gauche",value:2},
    {label:"Latéral droit", value:3},
    {label:"Arrière axe", value:4},
    {label:"Milieu axe", value:5},
    {label:"Milieu gauche", value:6},
    {label:"Milieu droit", value:7},
    {label:"Attaquant", value:8},
];

class PlayerInfos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ['oui', 'jesuis', 'cheunnnourry', 'marabou'],
            inputValue: '',
            query: '',
            clubQuery: '',
            teamQuery: '',

            clubList: '',
            teamList: '',

            hideTeam: false,
            hideClub: false,

            poste: '',
            club: '',
            team: '',

            visible: false,
        };
        this._filterClub = this._filterClub.bind(this);
        this._filterTeam = this._filterTeam.bind(this);
        this._setRole = this._setRole.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('clubList').then(
            value => {
                this.setState({clubList: JSON.parse(value)});
                this.forceUpdate();
            });

        this.setState({clubList: this.props.clubList});
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
    _filterTeam(query, dataSource) {
        if (query === '') {
            return [];
        }
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        if(data) {
            return data.filter(data => data.category.label.search(regex) >= 0);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {navigate} = this.props.navigation;

        if (!nextProps.user.fetching && nextProps.user && nextProps.user.done && !nextProps.user.error) {
            navigate('Congratz');
        }
    }


    _setTeam(item){
        this.setState({
                teamQuery: item.category.label + ' ' +item.division.label,
                hideTeam: true,
                team:item.id
            });
        this.props.user.team = item.id;
    }

    _setRole(itemValue) {
        this.setState({poste: itemValue});
        this.props.user.poste = itemValue;
    }
    _setClub(item) {
        this.setState({
            clubQuery: item.name,
            club: item.id,
            hideClub: true,
            teamList: item.teams
        });
        this.props.user.club = item.id;
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
        const {teamQuery, clubQuery, clubList, teamList} = this.state;
        const teamData = this._filterTeam(teamQuery, teamList);
        const clubData = this._filterClub(clubQuery, clubList);
        return (

            <View style={{
                flex: 7,
                backgroundColor: 'white',
                justifyContent: 'flex-start',
                paddingLeft: 30,
                paddingRight: 30
            }}>
                <SearchDropDown title={'Equipe adverse'} dataList={this.state.clubList} visible={this.state.visible}
                                onModalClose={(visible, data) => this.searchClosed(visible, data)}/>
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
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={[GLOBAL_STYLE.h1, GLOBAL_STYLE.mainColor]}>Le football et vous</Text>
                    <Text style={[GLOBAL_STYLE.miniDescription]}>
                        Ajoutez de vraies informations pour vous permettre d'échanger avec les joueurs et les clubs
                    </Text>
                </View>

                <KeyboardAvoidingView
                    style={{flex: 3, justifyContent: 'space-around', alignItems: 'center'}}
                    behavior="padding">

                    <TouchableOpacity onPress={() => {this.setState({visible:true}); this.forceUpdate()}} style={[{width: '100%'}]}>
                        <SelectedTeam team={this.state.team} placeholder={'Entrez le nom de votre club'}/>
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#eeeeee', width: '85%'}}>
                        <Picker style={GLOBAL_STYLE.input}
                                prompt="Poste joué"
                                selectedValue={this.state.poste}
                                onValueChange={(itemValue) => this._setRole(itemValue) }>
                            {ROLES.map((i, index) => (
                                <Picker.Item key={index} label={i.label} value={i.value}/>
                            ))}
                        </Picker>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        user: state.registeringUser,
        clubList: state.clubList
    };
};
export default connect(mapStateToProps)(PlayerInfos);
/*
 <View style={{backgroundColor: '#eeeeee'}}>
                        <Picker style={GLOBAL_STYLE.input}
                                prompt="Poste joué"
                                selectedValue={this.state.poste}
                                onValueChange={itemValue => this.setState({poste: itemValue})}>
                            {programmingLanguages.map((i, index) => (
                                <Picker.Item key={index} label={i.label} value={i.value}/>
                            ))}
                        </Picker>
                    </View>
 */
const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
        borderWidth:0,
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