import setAuthorizationToken from '../config/setAuthorizationToken';
import axios from "axios";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
import instance from "../config/axiosConfig";
export const userService = {
    login,
    addInfos,
    register,
    getUser,
    getUserType,
    putPlayer,
    putUser,
    searchUser,
    toggleFollow,
    getTeam
};
import jwt_decode from 'jwt-decode'
import {utils} from "../_constants/utils";
let currentUser = {stats:{}};
_onTokenChange = async(item, selectedValue) => {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
};

function login(username, password) {
    let form = new FormData();
    form.append('_username', username);
    form.append('_password', password);
    return instance.post("/api/login_check", form,{
        headers: {'content-type': 'multipart/form-data; charset=UTF-8',}
    })
        .then((response) => {

            console.log(response);
            const token = response.data.token;
            setAuthorizationToken(token);
            return token;
        }).then(responseJSON => {

            console.log(responseJSON);
            return this.getUser(jwt_decode(responseJSON).id);
        }).catch((error) => {
        console.log(error)
            return Promise.reject(error);
        })
}

function getUser(id) {
    return instance.get("/api/users/"+id)
        .then(response => {
            console.log(response.data);
               return response.data;
        }).catch((error) => {
        })
}

function getTeam(id) {
    return instance.get("/api/teams/"+id)
        .then(response => {
            return response.data;
        }).catch((error) => {
        })
}

function getUserType(id) {
    return instance.get("/api/players?user=" + id)
        .then(response => {
            return response.data["hydra:member"][0];
        }).catch(err => console.log(err))
}
function addInfos(user) {
    return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(user);onReject('erreur') }
    });

}
function register(user) {
    const sendUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        plainPassword: user.password,
        profilepicture: "",
        sexe: user.sexe,
        userType: user.userType,
    };

    return instance.post('/api/users', sendUser)
        .then(user => {
            /* login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }*/

            return user;
        });

}
function putPlayer(player) {
    return instance.put("/api/players/" + player.id,{...player, position:player.position["@id"]})
        .then(response => {
            Object.assign(currentUser.stats, response.data);
            return currentUser;

        }).catch((error) => {
            console.error(error);
        })
}
function toggleFollow(bool, user, followed){
    if(!bool){
        return instance.delete("/api/user_follows_player/" + user.id +"/"+ followed.player.id )
            .then(response => {
                user.players.some( e => {
                    if(e.id === followed.player.id){
                        user.players.splice(user.players.indexOf(e), 1);
                        return user;
                    }
                });
            }).catch((error) => {
                console.error(error);
            });
    } else {
        return instance.post("/api/user_follows_player", {users:user.id,players:followed.id})
            .then(response => {
                return response;

            }).catch((error) => {
                console.error(error);
            });
    }
}
function putUser(player, media) {
    const user = {
        firstname: player.firstname,
        lastname: player.lastname,
        email: player.email,
        profilepicture: player.profilepicture,
        sexe: player.sexe["@id"],
        userType: player.userType["@id"],
        //players: player.players,
        //teamsLiked: player.teamsLiked.map(teams => teams["@id"])
    };
    if(media){
        let uriParts = media.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let data = new FormData ();
        data.append('media',{
            uri:media.uri,
            name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `.${fileType}`,
            type: `image/${fileType}`
        });
        data.append('width', media.width);
        data.append('height', media.height);
        return axios.post(utils.NODEJS + "media/upload/", data).then(response => {
            user.profilepicture = response.data;
            return userRequest(player, user);
        });


        }else {
            return userRequest(player, user);
        }


}
function userRequest(p,u) {
    return instance.put("/api/users/" + p.id, u)
        .then(response => {
            console.log(response.data)
            return response.data;

        }).catch((error) => {
            console.error(error);
        });
}
function searchUser(query){
    let array = [];
    return instance.get("/api/users?firstname=" +query)
        .then(response => {
            array = response.data["hydra:member"];

            return instance.get("/api/clubs?name=" + query)
                .then(club => {
                    return array.concat(club.data["hydra:member"]);
                }).catch((error) => {
                   console.log(error);
            })
        }).catch((error) => {
            console.error(error);
        })
}
function handleResponse(test, response) {
    if (!test) {
        return Promise.reject(response.statusText);
    }

    return response;
}
