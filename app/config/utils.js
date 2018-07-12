import {Permissions, Notifications} from 'expo';
import instance from "./axiosConfig";
import React from "react";
import {TouchableOpacity} from "react-native";

const _isUser = (user, inspected) => {
    return user.id === inspected.id;
};

const _isFollowing = (user, inspected) => {
    console.log(inspected)
    if (inspected["@type"] === 'User' && inspected.userType.label === 'Joueur') {
        return user.players.some(e => e.id === inspected.player.id)
    } else if (inspected["@type"] === 'Team') {
        return user.teamsLiked.some(e => e.id === inspected.id)
    }
};

const _userTABS = (user) => {


    if (user.userType.label === "Joueur") {
        return PLAYERTABS;
    } else if (user.userType.label === 'Supporter') {
        return SUPPORTERTABS;
    } else {
        return COACHTABS;
    }
};
const PLAYERTABS = [
    {
        label: 'Passe dé.',
        dim: {height: 20, width: 20},
        picto: require('../assets/img/picto/menu/actions/assist.png'),
        action: 'assists'
    },
    {label: 'But', picto: require('../assets/img/picto/menu/actions/goal.png'), action: 'goals'},
    {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
];
const COACHTABS = [
    {label: 'Interview', picto: require('../assets/img/picto/menu/actions/interview.png'), action: 'interview'},
    {label: 'Résumé', picto: require('../assets/img/picto/menu/actions/article.png'), action: 'article'},
    {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
];

const SUPPORTERTABS = [
    {label: 'Vidéo', picto: require('../assets/img/picto/menu/actions/photo.png'), action: 'video'},
    {label: 'Photo', picto: require('../assets/img/picto/menu/actions/photo-green.png'), action: 'photo'},
    {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
];
const _isLiked = () => {

};
const renderIdentification = (str) => {
    let results = [];
        function getFromBetween(sub1, sub2) {
            if (str.indexOf(sub1) < 0 || str.indexOf(sub2) < 0) {
                return false;
            }
            var SP = str.indexOf(sub1) + sub1.length;
            var string1 = str.substr(0, SP);
            var string2 = str.substr(SP);
            var TP = string1.length + string2.indexOf(sub2);
            return str.substring(SP, TP);
        }
        function removeFromBetween(sub1, sub2) {
            if (str.indexOf(sub1) < 0 || str.indexOf(sub2) < 0) {
                return false;
            }
            var removal = sub1 + getFromBetween(sub1, sub2) + sub2;
            str = str.replace(removal, "");
        }
        function getAllResults(sub1, sub2) {
            // first check to see if we do have both substrings
            if (str.indexOf(sub1) < 0 || str.indexOf(sub2) < 0) {
                return;
            }

            // find one result
            var result = getFromBetween(sub1, sub2);
            // push it to the results array
            results.push(result);
            // remove the most recently found one from the string
            removeFromBetween(sub1, sub2);

            // if there's more substrings
            if (str.indexOf(sub1) > -1 && str.indexOf(sub2) > -1) {
                getAllResults(sub1, sub2);
            }
            else return;
        }
        function get(str, sub1, sub2)
    {
        results = [];
        str = string;
        getAllResults(sub1, sub2);
        return (results);
    }
    let strArray = str.split(/[\[\]]/);
    let identifiedUsers = get(str,"[","]");
    let finalStr;
    let keys = [];
    for(let i = 0; i < strArray.length; i++){
        for(let y = 0; y < identifiedUsers.length; y++){

            if(strArray[i] === identifiedUsers[y]){
                let ID = identifiedUsers[y].split(':').pop().split(';').shift();
                let userStr = identifiedUsers[y].split(/[:;]/)[0];
                strArray[i] = userStr;
                keys.push({id:i,user:+ID});
            }
        }
    }
    return {strArray, keys};
};

/**
 * USE STR MODIFIER
 * { utils.renderIdentification().strArray.map((str, index)=> {
                    for(let y = 0; y < utils.renderIdentification().keys.length; y++){
                        if(utils.renderIdentification().keys[y].id === index ){
                            return (
                                <TouchableOpacity  onPress={() => {console.log(key.user)}}>
                                    <Text style={{color:'#003366', fontWeight:'bold'}}>{str}</Text>
                                </TouchableOpacity>);
                        }else if(y === utils.renderIdentification().keys.length -1 && utils.renderIdentification().keys[y].id !== index){
                            return (
                                <Text>{str}</Text>
                            )
                        }
                    }
 */

async function registerForPushNotificationsAsync(userID) {
    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    token = token.replace('ExponentPushToken[', '');
    token = token.replace(']', '');
    return instance.post('/api/userToken', {
        user: userID,
        token: token
    }).then(user => {
        return user;
    }).catch(
        error => {
            console.log(error);
        });
}

export default {
    _isUser,
    renderIdentification,
    _isFollowing,
    _userTABS,
    registerForPushNotificationsAsync
}