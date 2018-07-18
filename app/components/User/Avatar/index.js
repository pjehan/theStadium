import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {utils} from "../../../_constants/utils";

class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            items: [],
        };

        this._renderTeam = this._renderTeam.bind(this);
        this._renderUser = this._renderUser.bind(this);
    }
    _renderTeam() {
        if(!this.props.user.teams[0].club.profilepicture) {
            return (
                <View style={[style.profilePic, {backgroundColor: '#cccccc'}]}/> )
        }else {
            return(
            <Image style={style.profilePic} resizeMode={"cover"} source={{uri: utils.NODEJS + this.props.user.teams[0].club.profilepicture}}/>
            )
        }
    }
    _renderClub(){
        if(!this.props.user.profilepicture) {
            return(
                <Image style={style.profilePic} source={{uri: utils.NODEJS + this.props.profilepicture}}/>
            )
        }else {
            return (
                <View style={[style.profilePic]}/> )
        }
    }
    _renderUser() {
        if(!this.props.user.profilepicture) {
            return (
                <View style={[style.profilePic, {backgroundColor: '#cccccc'}]}/> )
        }else {
            return(
                <Image style={[style.profilePic]} resizeMode={"cover"} source={{uri: utils.NODEJS + this.props.user.profilepicture}}/>
            )
        }
    }
    render() {
        return (
            this.props.user.userType === 'Coach' ?
                this._renderTeam()  :
                this._renderUser()
        )
    }
}

export {Avatar}

const style = StyleSheet.create({

    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 5
    }
});