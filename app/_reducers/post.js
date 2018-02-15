import {postConstants} from '../_constants';

export function postList(state = {
    posts: [{
        owner: null,
        type: null,
        media: [{url: null}],
        content: null,
        postDate: null,
        post_likes: null,
        post_comments: null,
        post_shares: null,
    }],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {

        // POSTS HANDLING
        case postConstants.GETALL_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.GETALL_FAILURE:
            return {...state, fetching: false, error: action.payload};
        case postConstants.GETALL_SUCCESS:
            return {...state, fetching: false, fetched: true, posts: action.payload};
            break;




        default:
            return state;
    }
}

export function commentList(state = {
    post_comments: [{
        user: {
            lastName: null,
            firstName: null,
            profilePic: null,
            sex: null,
            team: null
        }, comment: null
    }],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch(action.type) {
        // COMMENTS HANDLING
        case postConstants.GETALL_COMMENTS_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.GETALL_COMMENTS_FAILURE:
            return {...state, fetching:false, fetched:false, error:action.payload};
            break;
        case postConstants.GETALL_COMMENTS_SUCCESS:
            return {...state, fetching:false, fetched:true};
            break;

        case postConstants.ADD_COMMENT_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.ADD_COMMENT_FAILURE:
            return {...state, fetching:false, fetched: false, error: action.payload};
            break
        case postConstants.ADD_COMMENT_SUCCESS:
            return {...state, fetching:false, fetched:true, posts: action.payload};
            break;

        default:
            return state;
    }
}