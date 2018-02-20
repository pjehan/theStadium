import {postConstants} from '../_constants';
import {postService} from '../_services';
import {alertActions} from './alert'
export const postActions = {
    getAll,
    add,
    addComment,
    getComments,
    deleteComment,
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
function add(post) {
    return (dispatch) => {
        dispatch(request());
        postService.add(post)
            .then(
                posts => dispatch(success({posts})),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() {return { type: postConstants.ADD_POST_REQUEST } }
    function success(posts) { return { type: postConstants.ADD_POST_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.ADD_POST_FAILURE, payload: error} }
}

function addComment(id, comment) {
    return (dispatch) => {
        dispatch(request());
        postService.addComment(id, comment)
            .then(
                comments => {console.log(id,comment);dispatch(success({comments}))},
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

function deleteComment(id, commentID) {
    return (dispatch) => {
        dispatch(request());
        postService.deleteComment(id, commentID)
            .then(
                comments => {dispatch(success({comments}))},
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {return { type: postConstants.ADD_COMMENT_REQUEST } }
    function success(posts) { return { type: postConstants.ADD_COMMENT_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.ADD_COMMENT_FAILURE, payload: error} }
}

function getComments(id) {
    return (dispatch) => {
        dispatch(request());
        postService.getComments(id)
            .then(
                comments => {
                    console.log('******************', comments);dispatch(success({comments}))},
                error=>{
                    dispatch(failure(error));
                }
            )
    };

    function request() {return { type: postConstants.GETALL_COMMENTS_REQUEST } }
    function success(comments) { return { type: postConstants.GETALL_COMMENTS_SUCCESS, payload: comments} }
    function failure(error) { return { type: postConstants.GETALL_COMMENTS_FAILURE, payload: error} }
}