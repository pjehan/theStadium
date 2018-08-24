import React, {Component} from 'react';

import {
    Text,
    View,
    TextInput,
    Keyboard,
    DatePickerAndroid,
    TouchableOpacity,
    Platform, StyleSheet,
    TimePickerAndroid, ScrollView,
    Modal, FlatList
} from 'react-native';
import CustomInput from "../CustomInput";
import AccordionSearch from "../AccordionSearch/index";
import {userActions} from "../../_actions/user";
import {connect} from "react-redux";
import ProfilePic from "../ProfilePic";
const initialState = {
    dataList: [],
}
class SearchDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this._filterClub = this._filterClub.bind(this);
        this._renderResult = this._renderResult.bind(this);
        this.onChangeInfos = this.onChangeInfos.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        if(!nextProps.dataList) {
        }
        this.setState({dataList: nextProps.search});
        this.forceUpdate();
    }

    onChangeInfos(state, newvalue){
        this.setState({[state]: newvalue});
    }

    _filterClub(query, dataSource) {
        if (query === '' || !query) {
            return [];
        }else{
        let data = dataSource;
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log(data);
        if (data) {
            return data.filter(data => data.name.search(regex) >= 0);
        }
        }
    }

    _onClose(canceled, data) {
        if(!canceled) {
            this.props.onModalClose(false, data);
            //this.setState(initialState)
        }else {
            this.props.onModalClose(false, null);
            //this.setState(initialState)
        }
    }

    _renderResult(data) {
        return (
            <FlatList
                refreshing={ (!data)}
                style={{paddingHorizontal:10,alignSelf:'flex-start',flex:1}}
                data={data}
                renderItem={({item}) => this._renderItem(item)}
            />
        )
    }

    _renderItem(item){
        if(item["@type"] === 'Club') {
            return (
                <AccordionSearch itemSelected={(team, club) => {
                    delete club.teams;
                    team.club = club;
                    this._onClose(false, team);
                }} item={item}/>
            )
        }else if(item["@type"] === 'User' && item.userType.label === 'Joueur'){
            return (
                <View style={{
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    borderColor: '#cccccc',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                      key={this.props.search.indexOf(item)}>
                    <TouchableOpacity style={searchStyle.tabs} onPress={() => this._onClose(false, item)}>
                        <ProfilePic user={item}/>
                        <Text style={searchStyle.tabText}>{item.firstname} {item.lastname}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderColor: '#cccccc',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 40
            }}>
                <TouchableOpacity style={{fontSize:18}} onPress={() => {
                    this._onClose(true)
                }}>
                    <Text>Annuler</Text>
                </TouchableOpacity>
                <Text style={{fontWeight: '600',fontSize:18}}>{this.props.title}</Text>
                <TouchableOpacity onPress={() => {
                }}>
                    <Text style={{fontWeight: '600',fontSize:18, color: '#003366'}}>Valider</Text>
                </TouchableOpacity>
            </View>
        )
    }

    searchUser() {
        this.props.navigation.dispatch(userActions.searchUser(this.state.search))
    }

    render(){
        const {query, dataList} = this.state;
        const data = this.props.dataList ? this._filterClub(query, this.props.dataList) : this.state.dataList;
        return (
            <Modal style={{flex: 1}} animationType={"slide"} transparent={false}
                   visible={this.props.visible}

                   onRequestClose={() => {
                       console.log("Modal has been closed.")
                   }}>
                {this._renderHeader()}

                {this.props.willRequest ?
                <View style={[searchStyle.inputContainer]}>
                        <View style={[searchStyle.inputContainer]}>

                        <CustomInput
                            container={{justifyContent: 'flex-start', flex: 1}}
                            placeholder={'Rechercher'}
                            input={[{flex: 1, padding: 5}]}
                            state={'search'}
                            textColor={'#000000'}
                            placeholderTextColor={'#cccccc'}
                            borderColor={'#cccccc'}
                            backgroundColor={'#ffffff'}
                            security={false}
                            onChangeParent={(state, newvalue) => this.onChangeInfos(state, newvalue)}
                        />
                        <TouchableOpacity
                            style={[searchStyle.commentInputContainer]}
                            onPress={() => {
                                this.searchUser()
                            }}
                            accessibilityTraits="button"
                        >
                            <View><Text style={[searchStyle.commentInputText]}>Rechercher</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
                    :<CustomInput
                        container={{justifyContent:'flex-start',width:'100%',paddingHorizontal:10,marginBottom:10,paddingVertical:10,borderBottomWidth:1,borderBottomColor:'#cccccc'}}
                        placeholder={'Rechercher'}
                        state={'query'}
                        textColor={'#000000'}
                        placeholderTextColor={'#cccccc'}
                        borderColor={'#cccccc'}
                        backgroundColor={'#ffffff'}
                        security={false}
                        onChangeParent={(state, newvalue) => this.onChangeInfos(state, newvalue)}
                    />}
                {this._renderResult(data)}
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
        clubList: state.clubList,
        search: state.searchList.user
    };
};
export default connect(mapStateToProps)(SearchDropDown);
const searchStyle =  StyleSheet.create({
    tabText: {
        marginLeft:15,
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    tabs:{
        flexDirection:'row',
        alignItems:'center'
    },
    tabContainer: {
        backgroundColor:'#FFF',
        paddingHorizontal:10,
        paddingVertical:15
    },
    inputContainer: {
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical:10,
        alignItems:'center',
    },
    commentInputText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginVertical: 6,
        marginHorizontal: 10,
    },
});