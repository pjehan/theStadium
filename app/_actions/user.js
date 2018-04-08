import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import {teamService} from "../_services";
//import { history } from '../_helpers';

export const userActions = {
    login,
    register,
    addInfos,
    putPlayer,
    getInspected,
    removePlayer,
    putUser,
};

function login(username, password) {
    let currentUser = {stats:{}}
    return dispatch => {
        dispatch(request({ username, password }));

        userService.login(username, password)
            .then(
                user => {
                    userService.getUserType(user.id)
                        .then(
                            userStats => {
                                Object.assign(currentUser, user);
                                currentUser.stats = userStats;
                                console.log(userStats);

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
                    console.log(error);
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
                    dispatch(success({player}));

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

function putUser(player){
    return dispatch => {
        dispatch(request(player));

        userService.putUser(player)
            .then(
                user => {
                    dispatch(success({player}));

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

function getInspected(id){
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
