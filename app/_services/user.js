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
    putPlayer
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
            console.log(jwt_decode(responseJSON))
            return this.getUser(jwt_decode(responseJSON).id)
        }).catch((error) => {
            return Promise.reject(error);
        })
}

function getUser(id) {

    return instance.get("/api/users/"+id)
        .then(response => {
               return response.data;
        }).catch((error) => {
            console.error(error);
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
    console.log(user);
    return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(user);onReject('erreur') }
    });

}
function register(user) {
    /**
     *
     *  "firstname": "string",
     "lastname": "string",
     "email": "string",
     "plainPassword": "string",
     "profilepicture": "string",
     "sexe": {},
     "userType": {}




     firstname:'',
     lastname:'',
     birthdate: '',
     password: '',
     email:'',
     userType:null,
     sexe:0,
     club:'',
     team: '',
     error: '',
     poste: '',
     */
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return instance.post('/api//users', requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response)
            }

            return null;
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

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
            console.log(response)
            Object.assign(currentUser.stats, response.data);
            return currentUser;

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
