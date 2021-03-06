import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import {teamService} from "../_services";
import {utils} from '../_constants';
const {messageType} = utils;

export const userActions = {
    login,
    register,
    addInfos,
    putPlayer,
    getInspected,
    removePlayer,
    putUser,
    searchUser,
    toggleFollow,
    searchClean
};

function login(username, password) {
    let currentUser = {stats:{}};
    return (dispatch,getState, {emit}) => {
        dispatch(request({ username, password }));

        userService.login(username, password)
            .then(
                user => {
                    console.log(user);
                    userService.getUserType(user.id)
                        .then(
                            userStats => {
                                Object.assign(currentUser, user);
                                currentUser.stats = userStats;
                                dispatch(success(currentUser));
                            },
                            error => {
                                dispatch(failure(error));
                                dispatch(alertActions.error(error));
                            }
                        )
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                responseUser => {

                    userService.login(user.email, user.password)
                        .then(
                            login => {
                                teamService.addUser(login.id, user.team, user.userType)
                                    .then(
                                        response =>{
                                            dispatch(success(user));
                                            dispatch(alertActions.success('Registration successful'));
                                        }
                                    )
                            }
                        );
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function putPlayer(player){
    return dispatch => {
        dispatch(request(player));

        userService.putPlayer(player)
            .then(
                user => {
                    dispatch(success(user));

                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(player) { return { type: userConstants.PLAYER_ADD_STATS_REQUEST, player } }
    function success(player) { return { type: userConstants.PLAYER_ADD_STATS_SUCCESS, player } }
    function failure(error) { return { type: userConstants.PLAYER_ADD_STATS_FAILURE, error } }
}
function toggleFollow(bool, user, followed){
    return dispatch => {
        dispatch(request(user));

        userService.toggleFollow(bool, user, followed)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.PUT_REQUEST, user } }
    function success(user) { return { type: userConstants.PUT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.PUT_FAILURE, error } }
}
function putUser(player, media){
    return dispatch => {
        dispatch(request(player));

        userService.putUser(player, media)
            .then(
                user => {
                    console.log(user)
                    dispatch(success(user));

                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(player) { return { type: userConstants.USER_PUT_REQUEST, player } }
    function success(user) { return { type: userConstants.USER_PUT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USER_PUT_FAILURE, error } }
}

function getInspected(id, callback){
    let inspectedUser = {stats:{}}
    return dispatch => {
        dispatch(request({ id }));

        userService.getUser(id)
            .then(
                user => {
                    userService.getUserType(user.id)
                        .then(
                            userStats => {
                                Object.assign(inspectedUser, user);
                                inspectedUser.stats = userStats;
                                dispatch(success(inspectedUser));
                                callback( Object.assign({stats: userStats}, inspectedUser));
                            },
                            error => {
                                dispatch(failure(error));
                                dispatch(alertActions.error(error));
                            }
                        )
                    ;
                    //history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.INSPECT_USER_REQUEST, user } }
    function success(user) { return { type: userConstants.INSPECT_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.INSPECT_USER_FAILURE, error } }
}

function getInspectedTeam(id){
    return dispatch => {
        dispatch(request({ id }));
        userService.getTeam(id)
            .then(
                team => {
                    dispatch(success(team));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(team) { return { type: userConstants.INSPECT_USER_REQUEST, team } }
    function success(team) { return { type: userConstants.INSPECT_USER_SUCCESS, team } }
    function failure(error) { return { type: userConstants.INSPECT_USER_FAILURE, error } }
}


function removePlayer() {
    return {type: userConstants.REMOVE_INSPECTED};
}
function addInfos(user) {
    return dispatch => {
        dispatch(request(user));

        userService.addInfos(user)
            .then(
                user => {
                    dispatch(success({user}));

                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_ADD_INFOS_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_ADD_INFOS_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_ADD_INFOS_FAILURE, error } }
}
function searchClean() {
    return dispatch => {
        dispatch(success([]))
    }

    function success(user) { return { type: userConstants.SEARCH_CLEAN, user } }
}
function searchUser(query){
    return dispatch => {
        dispatch(request(query));

        userService.searchUser(query)
            .then(
                user => {
                    dispatch(success(user));

                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.SEARCH_REQUEST, user } }
    function success(user) { return { type: userConstants.SEARCH_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SEARCH_FAILURE, error } }
}