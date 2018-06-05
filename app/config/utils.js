const _isUser = (user, inspected) =>  {
    return user.id === inspected.id;
};

const _isFollowing = (user, inspected) => {
    console.log(inspected)
    if ((inspected.userType !== (undefined || null)) && inspected.userType.label === 'Joueur') {

        return user.players.some( e => e.id === inspected.player.id)
    } else {
        if (inspected.teams[0]) {return user.teamsLiked.includes('/api/teamsLiked' + inspected.teams[inspected.teams.length - 1].id);}
    }
};

export default {
    _isUser,
    _isFollowing
}