import React, { Component } from "react";
import {
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    StyleSheet,
    View, TouchableOpacity, Text, Image
} from "react-native";
import ProfilePic from "../ProfilePic/index";

import GLOBAL from "../../config/utils";
import {Icon} from "react-native-elements";
import {userActions} from "../../_actions/user";
export default class AccordionSearch extends Component {

    constructor(props){
        super(props);

        this.state = {
            displayTeam: false
        }
    }

    _renderIsFollowed(item) {
        if(GLOBAL._isFollowing(this.props.currentUser, item)){
            return (
                <TouchableOpacity onPress={() => this.toggleFollow(false, item)} style={{height:20,width:20,borderRadius:20}}>
                    <Image style={{height:20,width:20,borderRadius:20}} source={require('../../assets/img/picto/Certification-bleue.png')} resizeMode={'cover'} />
                </TouchableOpacity>
            )
        }else {
            return (
                <TouchableOpacity onPress={() => this.toggleFollow(false, item)} style={{height:20,width:20,borderRadius:20}}>
                    <Image style={{height:20,width:20,borderRadius:20}} source={require('../../assets/img/picto/add.png')} resizeMode={'cover'} />
                </TouchableOpacity>
            )
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

    selectItem(item, club){
        this.props.itemSelected(item, club);
    }

    goToProfile(item) {
        if (GLOBAL._isUser(this.props.currentUser, item)) {
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: this.props.currentUser,
            };
            this.props.navigation.navigate("CoachProfile", users);
        } else {
            /*this.props.dispatch(userActions.getInspectedTeam(item.id));
            const users = {
                currentUser: this.props.currentUser,
                inspectedUser: item,
            };
            this.props.navigation.navigate("CoachProfile", users);*/
        }
    }

    _renderClubTeam(item, club){
        return (
            <View style={{justifyContent: 'space-between', paddingVertical:10, borderTopWidth:1,borderColor:'#cccccc',flexDirection: 'row', alignItems: 'center'}} >
                <TouchableOpacity style={searchStyle.tabs} onPress={() => this.props.search ? this.goToProfile(item) : this.selectItem(item, club)}>
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
                {this.props.search ? <TouchableOpacity onPress={() => this.toggleFollow(GLOBAL._isFollowing(this.props.currentUser, item), item)}>
                    {this._renderIsFollowed(item)}
                </TouchableOpacity>
                    : null}
            </View>
        )
    }

    _renderClubList(club){
        return <FlatList
            style={{paddingLeft:20}}
            data={club.teams}
            extraData={club.teams}
            renderItem={({item}) => this._renderClubTeam(item, club)}
        />
    }
    render() {
        const item = this.props.item;
        return (
            <View style={{borderBottomWidth:1,borderColor:'#cccccc',
                flexDirection: 'column'}}
                  >
                <TouchableOpacity onPress={() => {this.setState({displayTeam: !this.state.displayTeam});this.forceUpdate()}}
                                  style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',paddingVertical:10,width:'100%'}}>
                    <View style={searchStyle.tabs} >
                        <ProfilePic user={item}/>
                        <Text style={searchStyle.tabText}>{item.name}</Text>
                    </View>
                    <View >
                        <Icon style={{transform: [{ rotate: !this.state.displayTeam ? '90deg' : '-90deg'}]}}
                              color='#000000'
                              size={25}
                              name={'chevron-right'}/>
                    </View>
                    </TouchableOpacity>
                {this.state.displayTeam ? this._renderClubList(item) : null}
            </View>
        );
    }
}

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