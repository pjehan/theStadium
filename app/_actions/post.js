import {postConstants} from '../_constants';
import {postService} from '../_services';
import {alertActions} from './alert'
export const postActions = {
    getAll,
    getOwnerList,
    add,
    addComment,
    getComments,
    deleteComment,
    toggleLikePost,
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

function getOwnerList(id) {
    return (dispatch) => {
        dispatch(request());
        postService.getOwnerList(id)
            .then(
                posts => dispatch(success({posts})),
                error => {
                    console.error(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() {return { type: postConstants.GETALL_OWNER_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_OWNER_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.GETALL_OWNER_FAILURE, payload: error} }
}

function add(user, post) {
    return (dispatch) => {
        dispatch(request());
        postService.add(user, post)
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

function addComment(comment) {
    return (dispatch) => {
        dispatch(request());
        postService.addComment(comment)
            .then(
                comments => {dispatch(success({comments}))},
                error => {
                    console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {return { type: postConstants.ADD_COMMENT_REQUEST } }
    function success(comments) { return { type: postConstants.ADD_COMMENT_SUCCESS, payload: comments} }
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
                   dispatch(success({comments}))},
                error=>{
                    dispatch(failure(error));
                }
            )
    };

    function request() {return { type: postConstants.GETALL_COMMENTS_REQUEST } }
    function success(comments) { return { type: postConstants.GETALL_COMMENTS_SUCCESS, payload: comments} }
    function failure(error) { return { type: postConstants.GETALL_COMMENTS_FAILURE, payload: error} }
}

function toggleLikePost(postID, userID, liked) {
    return (dispatch) => {
        dispatch(request());
        postService.toggleLikePost(postID, userID, liked)
            .then(
                response => {
                    dispatch(success({}));
                }
            )
    };
    function request() {return { type: postConstants.LIKES_REQUEST } }
    function success(posts) { return { type: postConstants.LIKES_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.LIKES_FAILURE, payload: error} }
}