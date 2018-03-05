import setAuthorizationToken from '../config/setAuthorizationToken';
import axios from "axios";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
export const userService = {
    login,
    addInfos,
    register,
};
const STORAGE_KEY = 'jwtToken';

_onTokenChange = async(item, selectedValue) => {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
};

function login(username, password) {
    console.log('là')
        return axios.post("http://192.168.20.2:8001/api/login_check", JSON.stringify({
                _username: username,
                _password: password
            }),{
                headers: { Accept: 'application/json',
                    'Content-Type': 'multipart/form-data; charset=UTF-8',}
            })
            .then((response) => {
                console.log('oui')
                const token = response.data.token;
                setAuthorizationToken(token);
                console.log(jwt_decode(token));
            }).catch((error) => {
        console.log(error);
            })
/*
    return fetch('http://172.24.219.225a/api/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
console.log(response.json());
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               // localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });*/
}

function getUser(user) {

}

function addInfos(user) {
    console.log(user);
    return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(user);onReject('erreur') }
    });

}
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return fetch('127.0.0.1:8000/api/users', requestOptions)
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
function handleResponse(test, response) {
    if (!test) {
        return Promise.reject(response.statusText);
    }

    return response;
}
