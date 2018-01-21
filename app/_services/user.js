import { authHeader } from '../_helpers';

export const userService = {
    login,
    addInfos,
    register,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/users/authenticate', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}
function addInfos(user) {
    console.log(user)
    return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(user);onReject('erreur') }
    });

}
function register(user) {
    return Promise.resolve({
        then: function(onFulfill, onReject) { onFulfill(user);onReject('erreur') }
    });

}
function handleResponse(test, response) {
    if (!test) {
        return Promise.reject(response.statusText);
    }

    return response;
}
