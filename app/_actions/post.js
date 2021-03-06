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
    sharePost,
    deletePost
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

function add(user, post, media) {
    return (dispatch) => {
        dispatch(request());
        postService.add(user, post, media)
            .then(
                posts => {
                    dispatch(success({posts}))},
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


function deletePost(post) {
    return (dispatch) => {
        dispatch(request());
        postService.deletePost(post)
            .then(
                posts => {
                    dispatch(success({posts}))},
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() {return { type: postConstants.DELETE_POST_REQUEST } }
    function success(posts) { return { type: postConstants.DELETE_POST_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.DELETE_POST_SUCCESS, payload: error} }
}


function addComment(comment,postID) {
    return (dispatch) => {
        dispatch(request());
        postService.addComment(comment)
            .then(
                comments => {
                    dispatch(success({postID:postID, comments: comments, commentID: comments["@id"]}))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {return { type: postConstants.ADD_COMMENT_REQUEST } }
    function success(comments) { return { type: postConstants.ADD_COMMENT_SUCCESS, payload: comments} }
    function failure(error) { return { type: postConstants.ADD_COMMENT_FAILURE, payload: error} }
}

function deleteComment(comment, postID, commentID) {
    return (dispatch) => {
        dispatch(request());
        postService.deleteComment(comment)
            .then(
                comments => {dispatch(success({comment: comment, commentID: commentID, postID: postID}))},
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {return { type: postConstants.DELETE_COMMENT_REQUEST } }
    function success(posts) { return { type: postConstants.DELETE_COMMENT_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.DELETE_COMMENT_FAILURE, payload: error} }
}

function getComments(id) {
    return (dispatch) => {
        dispatch(request());
        postService.getComments(id)
            .then(
                comments => {
                   dispatch(success(comments))},
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
                    console.log(response)
                    dispatch(success(response));
                }
            )
    };
    function request() {return { type: postConstants.LIKES_REQUEST } }
    function success(posts) { return { type: postConstants.LIKES_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.LIKES_FAILURE, payload: error} }
}

function sharePost(postID, userID){
    return (dispatch) => {
        dispatch(request());
        postService.sharePost(postID, userID)
            .then(
                response => {
                    dispatch(success({}));
                }
            ).catch(
                error => {
                    dispatch(failure(error))
                }
        )
    };
    function request() {return { type: postConstants.SHARES_REQUEST } }
    function success(posts) { return { type: postConstants.SHARES_SUCCESS, payload: posts} }
    function failure(error) { return { type: postConstants.SHARES_FAILURE, payload: error} }
}