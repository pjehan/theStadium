import {GLOBAL_STYLE} from "../assets/css/global";
import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ScrollView, FlatList, StyleSheet, Image
} from 'react-native';
import CustomInput from "../components/CustomInput";
import {connect} from "react-redux";
import {userActions} from "../_actions/user";
import ProfilePic from "../components/ProfilePic";
import GLOBAL from "../config/utils";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null
        }
    }
    onChangeInfos(state, newvalue) {
        this.setState({[state]: newvalue});
    }

    searchUser() {
        this.props.navigation.dispatch(userActions.searchUser(this.state.search))
    }

    goToProfile(item) {
        if(GLOBAL._isUser(this.props.currentUser, item)){
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.props.currentUser,
            };
            if (this.props.currentUser.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        }else {
            this.props.dispatch(userActions.getInspected(item.id));
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: item,
            };
            if ( item.userType.label === 'Coach') {
                this.props.navigation.navigate("CoachProfile", users);
            } else {
                this.props.navigation.navigate('Profile', users);
            }
        }
    }

    toggleFollow(bool, item){
        this.props.dispatch(userActions.toggleFollow(bool,this.props.currentUser, item));
        if(bool) {
            this.props.currentUser.players.some(e => {
                if (e.id === inspected.player.id) {
                    this.props.currentUser.players.splice(this.props.currentUser.players.indexOf(e), 1);
                    this.forceUpdate();
                }
            });
        }else  {
            this.props.currentUser.players.push(item);
            this.forceUpdate();
        }
    }

    _renderIsFollowed(item){
        if(GLOBAL._isUser(this.props.currentUser, item) || item.userType === 'Supporter'){
            return null
        }else {
            if(GLOBAL._isFollowing(this.props.currentUser, item)){
                return (
                    <TouchableOpacity onPress={() => this.toggleFollow(false, item)} style={{height:20,width:20,borderRadius:20}}>
                        <Image style={{height:20,width:20,borderRadius:20}} source={require('../assets/img/picto/Certification-bleue.png')} resizeMode={'cover'} />
                    </TouchableOpacity>
                )
            }else {
                return (
                    <TouchableOpacity onPress={() => this.toggleFollow(false, item)} style={{height:20,width:20,borderRadius:20}}>
                        <Image style={{height:20,width:20,borderRadius:20}} source={require('../assets/img/picto/add.png')} resizeMode={'cover'} />
                    </TouchableOpacity>
                )
            }
        }
    }

    _renderItem(item) {

            if(item.userType.label === 'Joueur') {
                return (<View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}
                      key={this.props.userList.indexOf(item)}>
                    <TouchableOpacity style={searchStyle.tabs} onPress={() => this.goToProfile(item)}>
                        <ProfilePic user={item}/>
                        <Text style={searchStyle.tabText}>{item.firstname} {item.lastname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {this._renderIsFollowed(item)}
                    </TouchableOpacity>
                </View>)
            }else {
                return (
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}
                              key={this.props.userList.indexOf(item)}>
                    <TouchableOpacity style={searchStyle.tabs} onPress={() => this.goToProfile(item)}>
                        <ProfilePic user={item}/>
                        <Text>{item.teams[0].team.club.name}</Text>
                        <Text style={{
                        paddingVertical: 2,
                        paddingHorizontal: 5,
                        fontSize: 10,
                        backgroundColor: '#003366',
                        color: '#ffffff',
                        marginRight: 10
                    }}>{item.teams[0].category.label} {item.teams[0].division.label}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {this._renderIsFollowed(item)}
                    </TouchableOpacity>
                    </View>
                )
            }
    }

    _renderList(){

        return(
            <FlatList
                data={this.props.userList}
                extraData={this.props.userList}
                refreshing={this.props.isFetching}
                renderItem={({item}) => this._renderItem(item)}
            />
        );
    }

    _renderInput() {
        return (
            <View style={[searchStyle.inputContainer]}>

                <CustomInput
                    container={{justifyContent:'flex-start',flex:1}}
                    placeholder={'Rechercher'}
                    input={[{flex:1, padding: 5}]}
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
                    onPress={() => {this.searchUser()}}
                    accessibilityTraits="button"
                    >
                    <View><Text style={[searchStyle.commentInputText]}>Envoyer</Text></View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View contentContainerStyle={[GLOBAL_STYLE.greyColorBG]}>
                    {this._renderInput()}
                <ScrollView style={searchStyle.tabContainer}>
                    {this._renderList()}
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userList: state.searchList.user,
        isFetching: state.searchList.fetching,
        currentUser: state.currentUser.user
    };
};
export default connect(mapStateToProps)(Search);

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