import {userService} from "./user";

export const postService = {
    getAll,
    add,
    addComment,
    getComments,
    deleteComment,
    getOwnerList
};
import axios from 'axios';
let postList = [
    {
        owner: {
            lastName: 'Maradou',
            firstName: 'Pierre',
            profilePic: '',
            sex: 'male',
            team:'Sénior DSE',
        },
        postType:4,
        media:[{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}],
        title: 'Le retour de ZIZOU !!',
        postDate: new Date(),

        oponentClub:'US Saint-Malo',
        oponentScore:2,
        score:3,
        club:'CPB Bréquigny',
        post_likes: 42,
        post_comments: [
            {
                user:{
                    lastName: 'Jesus',
                    firstName: 'JarJar',
                    profilePic: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/527a724ce4b008de58b3ea68/1383764526315/jar-jar-binks-dies-in-star-wars-deleted-scene-preview.jpg?format=300w',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
            {
                user:{
                    lastName: 'du eafefaefaefafaefDev',
                    firstName: 'Pro',
                    profilePic: 'http://resize2-parismatch.ladmedia.fr/r/625,417,center-middle,ffffff/img/var/news/storage/images/paris-match/brouillons/dave-on-m-a-paye-deux-fois-pour-l-amour-932515/13268781-1-fre-FR/Dave-On-m-a-paye-deux-fois-pour-l-amour.jpg',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
        ],
        post_shares: 1
    },
    {
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: ''
        },
        postType:2,
        goals: 5,
        postDate: new Date(2017, 11, 9, 10, 2, 5),
        post_likes: 40,
        post_comments:  [
            {
                user:{
                    lastName: 'Bink',
                    firstName: 'JarJar',
                    profilePic: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/527a724ce4b008de58b3ea68/1383764526315/jar-jar-binks-dies-in-star-wars-deleted-scene-preview.jpg?format=300w',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
            {
                user:{
                    lastName: 'du eafefaefaefafaefDev',
                    firstName: 'Pro',
                    profilePic: 'http://resize2-parismatch.ladmedia.fr/r/625,417,center-middle,ffffff/img/var/news/storage/images/paris-match/brouillons/dave-on-m-a-paye-deux-fois-pour-l-amour-932515/13268781-1-fre-FR/Dave-On-m-a-paye-deux-fois-pour-l-amour.jpg',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
        ],
        post_shares: 5
    },
    {
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: ''
        },
        postType:3,
        assist: 1,
        postDate: new Date(2017, 11, 9, 8, 2, 5),
        post_likes: 1,
        post_comments:  [
            {
                user:{
                    lastName: 'Binizizizizik',
                    firstName: 'JarJar',
                    profilePic: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/527a724ce4b008de58b3ea68/1383764526315/jar-jar-binks-dies-in-star-wars-deleted-scene-preview.jpg?format=300w',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
            {
                user:{
                    lastName: 'du Dev',
                    firstName: 'Pro',
                    profilePic: 'http://resize2-parismatch.ladmedia.fr/r/625,417,center-middle,ffffff/img/var/news/storage/images/paris-match/brouillons/dave-on-m-a-paye-deux-fois-pour-l-amour-932515/13268781-1-fre-FR/Dave-On-m-a-paye-deux-fois-pour-l-amour.jpg',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
        ],
        post_shares: 5
    },
    {
        owner: {
            lastName: 'Segara',
            firstName: 'Sophie',
            profilePic: '',
            sex: 'female',
            team: 'Senior FD3'
        },
        postType:1,
        content:'Jaime la teub très très fort',
        media:[{url:'https://le10static.com/img/a/2/4/0/3/0/4/240304-large.jpg'},{url:'http://cdn.planetefoot.net/wp-content/uploads/2016/10/zidane-1.jpg'}],
        postDate: new Date(2017, 11, 8, 10, 2, 5),
        post_likes: 4,
        post_comments:  [
            {
                user:{
                    lastName: 'Bink',
                    firstName: 'JarJar',
                    profilePic: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/527a724ce4b008de58b3ea68/1383764526315/jar-jar-binks-dies-in-star-wars-deleted-scene-preview.jpg?format=300w',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            },
            {
                user:{
                    lastName: 'du Dev',
                    firstName: 'Pro',
                    profilePic: 'http://resize2-parismatch.ladmedia.fr/r/625,417,center-middle,ffffff/img/var/news/storage/images/paris-match/brouillons/dave-on-m-a-paye-deux-fois-pour-l-amour-932515/13268781-1-fre-FR/Dave-On-m-a-paye-deux-fois-pour-l-amour.jpg',
                    sex: 'male',
                    team: 'Senior FD3'
                },
                comment:'JE TROUVE CELA OFFENSANT CELA NE RESPECTE LES DROIT DES GENRES FDP'
            }
        ],
        post_shares: 5
    },
];
function getAll() {

    let post = [];
    return axios.get("http://192.168.1.95:8001/api/posts/1")
        .then(response => {
            post.push(response.data);
            return post;
        }).catch((error) => {
            console.error(error);
        });
}
function getOwnerList(id){
    let post = [];
    return axios.get("http://192.168.1.95:8001/api/posts?owner=" + id)
        .then(response => {
            post.push(response.data);
            return post;
        }).catch((error) => {
            console.error(error);
        });
}
function add(user, post){
    console.log(post)
    let postToAdd = {
        title: null,
        creationDate: new Date(),
        content: null,
        goalsNbr: null,
        passNbr: null,
        postType: null,
        medias: [],
        comments: [],
        owner: "api/users/"+ user,
    };
    Object.assign(postToAdd, post);
    //postList.push(postToAdd);
    console.log(postToAdd)
    return axios.post("http://192.168.1.95:8001/api/posts",postToAdd).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
    /*return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(postList);onReject('erreur') }
    })*/
}

function addComment(comment) {
    /*postList[id].post_comments.push(comment);
    return Promise.resolve({
        then: function(onFulfill, onReject) {onFulfill(postList[id].post_comments);onReject('erreur')}
    })*/
    return axios.post("http://192.168.1.95:8001/api/comments", comment)
        .then(response => {
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}
function deleteComment(id, commentID) {
    postList[id].post_comments.splice(commentID,1);
    return Promise.resolve({
        then: function(onFulfill, onReject) {onFulfill(postList[id].post_comments);onReject('erreur')}
    })
}
function getComments(id) {
   /* if(id === undefined) {
        return Promise.resolve({
            then: function(onFullfill, onReject) {
                onFullfill([{
                    user: {
                        lastName: null,
                        firstName: null,
                        profilePic: null,
                        sex: null,
                        team: null
                    }, comment: null
                }]);
                onReject('erreur');
            }
        })
    }else {
        return Promise.resolve({
            then: function (onFulfill, onReject) {
                onFulfill(postList[id].post_comments);
                onReject('erreur')
            }
        });

    }*/
   let comments = [];
    return axios.get("http://192.168.1.95:8001/api/comments?post=" + id)
        .then(response => {
            console.log(response)
            comments.push(response.data["hydra:member"]);
            /*return userService.getUser(response.data.user).then(
                user => {
                    comments[0].user = user;
                    return comments;
                }
            );*/
            return comments;

        }).catch((error) => {
            console.error(error);
        });
}
function handleResponse(test, response) {
    if (!test) {
        return Promise.reject(response.statusText);
    }

    return response;
}