import {postConstants} from '../_constants';
import {postService} from '../_services';
import {alertActions} from './alert'
export const postActions = {
    getAll,
    addComment,
};
function getAll() {

    return (dispatch) => {
        dispatch(request());
        postService.getAll()
            .then(
                posts => dispatch(success({posts})),
                error => {
                    console.error(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() {return { type: postConstants.GETALL_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.GETALL_FAILURE, payload: error} }


}

function addComment(id, comment) {
    return (dispatch) => {
        dispatch(request());
        postService.addComment(id, comment)
            .then(
                newPosts => {console.log(id,comment);dispatch(success({newPosts}))},
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {return { type: postConstants.ADD_COMMENT_REQUEST } }
    function success(posts) { return { type: postConstants.ADD_COMMENT_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.ADD_COMMENT_FAILURE, payload: error} }
}