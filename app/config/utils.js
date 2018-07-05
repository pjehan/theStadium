import { Permissions, Notifications } from 'expo';
import instance from "./axiosConfig";

const _isUser = (user, inspected) =>  {
    return user.id === inspected.id;
};

const _isFollowing = (user, inspected) => {
    console.log(inspected)
    if (inspected["@type"] === 'User' && inspected.userType.label === 'Joueur') {
        return user.players.some( e => e.id === inspected.player.id)
    } else if(inspected["@type"] === 'Team') {
        return user.teamsLiked.some( e => e.id === inspected.id)
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
    _isFollowing,
    _userTABS,
    registerForPushNotificationsAsync
}