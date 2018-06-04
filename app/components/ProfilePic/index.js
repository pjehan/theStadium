import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';

export default class ProfilePic extends Component {
    constructor(props) {
        super(props)
    }

    imageRender() {
        const pictUrl = this.props.team ? this.props.team.club.profilePicture : this.props.user.profilepicture;

        if(!pictUrl){
            return <View style={[PostStyle.profilePic, {backgroundColor: '#cccccc'}]} />
        } else {
            return (
                <Image style={PostStyle.profilePic}
                       source={{uri: !this.props.team ? this.props.Owner.profilepicture : this.props.team.club.profilePicture}}/>
            )
        }
    }

    render(){
        return (
            this.imageRender()
        )
    }
}
ProfilePic.propTypes = {
    user: PropTypes.object,
    team: PropTypes.object,
};
const PostStyle = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 5
    },
    text: {
        color: 'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    userAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    ownerStyle: {
        flex:1,
        flexDirection: 'row',
        padding: 5,
    },
    userActionText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    actionText: {
        fontSize: 12
    },
    teamText: {
        color: "white",
        fontSize: 12
    },
    teamBackground: {
        backgroundColor: '#003366',
        padding: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    timeText: {
        fontSize: 12,
        color: '#cccccc',
        fontWeight: '400',
        marginLeft: 2
    }
});