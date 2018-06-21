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
    {label: 'Photo', picto: require('../assets/img/picto/menu/actions/photo.png'), action: 'photo'},
    {label: 'Publier', picto: require('../assets/img/picto/menu/actions/post.png'), action: 'simple'}
];
const _isLiked = () => {

}

export default {
    _isUser,
    _isFollowing,
    _userTABS
}