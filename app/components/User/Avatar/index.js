import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

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
        if(this.props.user.teams[0].club.profilepicture) {
            return (
                <View style={[style.profilePic, {backgroundColor: '#cccccc'}]}/> )
        }else {
            return(
            <Image style={style.profilePic} source={{uri: this.props.user.teams[0].club.profilePicture}}/>
            )
        }
    }

    _renderUser() {
        if(this.props.user.profilepicture) {
            return (
                <View style={[style.profilePic, {backgroundColor: '#cccccc'}]}/> )
        }else {
            return(
                <Image style={style.profilePic} source={{uri: this.props.user.profilepicture}}/>
            )
        }
    }
    render() {
        return (
            this.props.userType === 'Coach' ?
                this._renderTeam() :
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