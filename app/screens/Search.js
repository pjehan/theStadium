import {GLOBAL_STYLE} from "../assets/css/global";
import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ScrollView, FlatList, StyleSheet, Image, TextInput
} from 'react-native';
import CustomInput from "../components/CustomInput";
import {connect} from "react-redux";
import {userActions} from "../_actions/user";
import ProfilePic from "../components/ProfilePic";
import GLOBAL, {getActiveRouteName} from "../config/utils";
import AccordionSearch from "../components/AccordionSearch/index";
import { SearchBar } from 'react-native-elements'

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null,
            displayTeam: false
        };

        this._renderClubList = this._renderClubList.bind(this);
        this._renderIsFollowed = this._renderIsFollowed.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
        if(getActiveRouteName(nextProps.NavigationReducer) === 'Rechercher'){
            console.log(nextProps)
            this.searchInput.focus();
            this.forceUpdate();
        };
    }

    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue});
    }

    searchUser() {
        if (this.state.search) {
            this.props.navigation.dispatch(userActions.searchUser(this.state.search))
        };
    }

    goToProfile(item) {
        if (GLOBAL._isUser(this.props.currentUser, item)) {
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.props.currentUser,
            };
            if (this.props.currentUser.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        } else {
            this.props.dispatch(userActions.getInspected(item.id));
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: item,
            };
            if (item.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        }
    }

    toggleFollow(bool, item) {
        this.props.dispatch(userActions.toggleFollow(bool, this.props.currentUser, item));
        if (bool) {
            this.props.currentUser.players.some(e => {
                if (e.id === inspected.player.id) {
                    this.props.currentUser.players.splice(this.props.currentUser.players.indexOf(e), 1);
                    this.forceUpdate();
                }
            });
        } else {
            this.props.currentUser.players.push(item);
            this.forceUpdate();
        }
    }

    _renderIsFollowed(item) {
        if (GLOBAL._isUser(this.props.currentUser, item) || item["@type"] === 'User' && item.userType.label === 'Supporter') {
            return null
        } else {
            if (GLOBAL._isFollowing(this.props.currentUser, item)) {
                return (
                    <TouchableOpacity onPress={() => this.toggleFollow(false, item)}
                                      style={{height: 20, width: 20, borderRadius: 20}}>
                        <Image style={{height: 20, width: 20, borderRadius: 20}}
                               source={require('../assets/img/picto/Certification-bleue.png')} resizeMode={'cover'}/>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity onPress={() => this.toggleFollow(false, item)}
                                      style={{height: 20, width: 20, borderRadius: 20}}>
                        <Image style={{height: 20, width: 20, borderRadius: 20}}
                               source={require('../assets/img/picto/add.png')} resizeMode={'cover'}/>
                    </TouchableOpacity>
                )
            }
        }
    }

    _renderClubTeam(item) {
        return (
            <View style={{
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderTopWidth: 1,
                borderColor: '#cccccc',
                flexDirection: 'row',
                alignItems: 'center'
            }}
                  key={this.props.userList.indexOf(item)}>
                <TouchableOpacity style={searchStyle.tabs} onPress={() => this.goToProfile(item)}>
                    <ProfilePic user={item}/>
                    <Text>{item.club.name}</Text>
                    <Text style={{
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        fontSize: 10,
                        backgroundColor: '#003366',
                        color: '#ffffff',
                        marginRight: 10
                    }}>{item.category.label} {item.division.label}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {this._renderIsFollowed(item)}
                </TouchableOpacity>
            </View>
        )
    }

    _renderClubList(item) {
        return <FlatList
            style={{paddingLeft: 20}}
            data={item.teams}
            extraData={item.teams}
            renderItem={({item}) => this._renderClubTeam(item)}
        />
    }

    _renderItem(item) {
        if (item["@type"] === 'User' && (item.userType.label === 'Joueur')) {
            return (<View style={{
                borderBottomWidth: 1,
                paddingVertical: 10,
                borderColor: '#cccccc',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}
                          key={this.props.userList.indexOf(item)}>
                <TouchableOpacity style={searchStyle.tabs} onPress={() => this.goToProfile(item)}>
                    <ProfilePic user={item}/>
                    <Text style={searchStyle.tabText}>{item.firstname} {item.lastname}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {this._renderIsFollowed(item)}
                </TouchableOpacity>
            </View>)
        } else if (item["@type"] === 'Club') {
            return (
                <AccordionSearch currentUser={this.props.currentUser} navigation={this.props.navigation} search={true}
                                 userList={this.props.userList}
                                 item={item}/>
            )
        }
    }

    _renderList() {
        return (
            <FlatList
                style={{paddingVertical: this.props.userList.length > 0 ? 15 : 0}}
                data={this.props.userList}
                extraData={this.props.userList}
                refreshing={this.props.isFetching}
                renderItem={({item}) => this._renderItem(item)}
            />
        );
    }

    _renderInput() {
        return (
            <View style={{flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}><SearchBar
                round
                lightTheme
                clearIcon
                onChangeText={(value) => this.onChangeInfos('search', value)}

                    onClearText={() => {this.setState({search: ""})}}
                ref={
                    (c) => {
                        this.searchInput = c;
                    }
                }
                containerStyle={{flex:1,borderBottomWidth:0,borderTopWidth:0}}
                onSubmitEditing={() => {this.searchUser()}}
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder="Entrez le nom d'un(e) joueur, joueuse, équipe" />

                {this.state.search ?  <TouchableOpacity style={{padding:5,width:60,alignItems:'center'}} onPress={() => {
                        this.setState({search: ""}, () => {
                            this.searchInput.clearText();
                            this.props.navigation.dispatch(userActions.searchClean());
                            this.forceUpdate();
                        })
                    }
                }>
                    <Text>Annuler</Text>
                </TouchableOpacity>  : null }
        </View>)

    }

    render() {
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG, {justifyContent:'flex-start'}]}>
                {this._renderInput()}
                <ScrollView style={searchStyle.tabContainer}>
                    {this._renderList()}
                </ScrollView>
            </View>
        )
    }
}
/*
<View style={[searchStyle.inputContainer]}>
                <TextInput
                    style={{paddingLeft:5,flex: 1,paddingVertical:5,fontSize:12}}
                    placeholder={'Entrez le nom d\'un(e) joueur, joueuse, équipe'}
                    returnKeyType={ "send" }
                    textColor={'#000000'}
                    placeholderTextColor={'#cccccc'}
                    blurOnSubmit={false}
                    ref={
                        (c) => {
                            this.searchInput = c;
                        }
                    }
                    onChange={(value) => this.onChangeInfos('search', value)}
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
 */
const mapStateToProps = (state) => {
    return {
        userList: state.searchList.user,
        isFetching: state.searchList.fetching,
        currentUser: state.currentUser.user,
        NavigationReducer: state.NavigationReducer
    };
};
export default connect(mapStateToProps)(Search);

const searchStyle = StyleSheet.create({
    tabText: {
        marginLeft: 15,
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabContainer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        //paddingVertical: 15
    },
    inputContainer: {
        backgroundColor:'#ffffff',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
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