import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
//import { history } from '../_helpers';

export const userActions = {
    login,
    register,
    addInfos,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username, password }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/');
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
        console.log(user);
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
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

function addInfos(user) {
    return dispatch => {
        console.log(user)
        dispatch(request(user));

        userService.addInfos(user)
            .then(
                user => {
                    console.log(user)
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
