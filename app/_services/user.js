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
    searchUser
};
import jwt_decode from 'jwt-decode'
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
            const token = response.data.token;
            setAuthorizationToken(token);
            return token;
        }).then(responseJSON => {
            return this.getUser(jwt_decode(responseJSON).id)
        }).catch((error) => {
            return Promise.reject(error);
        })
}

function getUser(id) {
    console.log(instance)
    return instance.get("/api/users/"+id)
        .then(response => {
               return response.data;
        }).catch((error) => {
        })
}
function getUserType(id) {
    return instance.get("/api/players?user=" + id)
        .then(response => {
            console.log(response)
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
    /*return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(user);onReject('erreur') }
    });*/

}
function putPlayer(player) {
    console.log(player.id);
    return instance.put("/api/players/" + player.id,player)
        .then(response => {
            Object.assign(currentUser.stats, response.data);
            return currentUser;

        }).catch((error) => {
            console.error(error);
        })
}

function putUser(player, media) {
    const user = {
        firstname: player.firstname,
        lastname: player.lastname,
        email: player.email,
        profilepicture: player.profilepicture,
        sexe: player.sexe,
        userType: player.userType,
        //players: player.players,
        //teamsLiked: player.teamsLiked
    };
    console.log(media);
    console.log(user)
    if(media){
        let uriParts = media.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let data = new FormData ();
        data.append('media',{
            uri:media,
            name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + `.${fileType}`,
            type: `image/${fileType}`
        });
        return axios.post("http://192.168.1.95:3000/media/upload/", data).then(response => {
            user.profilepicture = response.data;
            userRequest(player, user);
        });

        function userRequest(p,u){
console.log(player.id);
            return instance.put("/api/users/" + player.id,user)
                .then(response => {
                    console.log(response)
                    return response.data;

                }).catch((error) => {
                console.log(error);
                    console.error(error);
                })
        }
    }
}
function searchUser(query){
    return instance.get("/api/users?firstname=" +query)
        .then(response => {
            console.log(response.data["hydra:member"])
            return response.data["hydra:member"];
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
