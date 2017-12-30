import {postConstants} from '../_constants';
import {postService} from '../_services';
import {alertActions} from './alert'
export const postActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        postService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, error } }
}