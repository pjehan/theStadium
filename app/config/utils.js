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

const _isLiked = () => {

}

export default {
    _isUser,
    _isFollowing
}