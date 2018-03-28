import setAuthorizationToken from '../config/setAuthorizationToken';
import axios from "axios";
import * as AsyncStorage from "react-native/Libraries/Storage/AsyncStorage";
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
    return axios.post("http://192.168.1.95:8001/api/login_check", form,{
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

    return axios.get("http://192.168.1.95:8001/api/users/"+id)
        .then(response => {
               return response.data;
        }).catch((error) => {
            console.error(error);
        })
}
function getUserType(id) {
    return axios.get("http://192.168.1.95:8001/api/players?user=" + id)
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
     * ->add('email', EmailType::class, array('label' => 'form.email', 'translation_domain' => 'FOSUserBundle'))
     ->add('username', null, array('label' => 'form.username', 'translation_domain' => 'FOSUserBundle'))
     ->add('plainPassword', RepeatedType::class, array(
     'type' => PasswordType::class,
     'options' => array('translation_domain' => 'FOSUserBundle'),
     'first_options' => array('label' => 'form.password'),
     'second_options' => array('label' => 'form.password_confirmation'),
     'invalid_message' => 'fos_user.password.mismatch',
     ))
     ->add('firstname', TextType::class)
     ->add('lastname', TextType::class)
     ->add('sexe', EntityType::class, ['class' => Sexe::class])
     ->add('userType', EntityType::class, ['class' => Type::class]);
     */
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return axios('127.0.0.1:8000/api/users', requestOptions)
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
    return axios.put("http://192.168.1.95:8001/api/players/" + player.id,player)
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
