import {postConstants} from '../_constants';

export function postList(state = {
    posts: [{
        id: null,
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

            //ADD

        case postConstants.ADD_POST_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.ADD_POST_FAILURE:
            return {...state, fetching: false, error: action.payload};
            break;
        case postConstants.ADD_POST_SUCCESS:
            return {...state, fetching: false, fetched: true};
            break;


        default:
            return state;
    }
}

export function ownerList(state = {
    posts: [{
        id: null,
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
        case postConstants.GETALL_OWNER_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.GETALL_OWNER_FAILURE:
            return {...state, fetching: false, error: action.payload};
        case postConstants.GETALL_OWNER_SUCCESS:
            return {...state, fetching: false, fetched: true, posts: action.payload};
            break;
        default:
            return state;
    }
}

export function commentList(state = {
    post_comments: [{
        user: {
            id:null,
            lastname: null,
            firstname: null,
            profilepicture: null,
            team: null
        },
        contenu: null,
        createdAt:null,
        id:null,
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

            return {...state, fetching:false, fetched:true, comments: action.payload};
            break;
        // ADD
        case postConstants.ADD_COMMENT_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.ADD_COMMENT_FAILURE:
            return {...state, fetching:false, fetched: false, error: action.payload};
            break;
        case postConstants.ADD_COMMENT_SUCCESS:
            return {...state, fetching:false, fetched:true, comments: action.payload};
            break;
        // REMOVE
        case postConstants.DELETE_COMMENT_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.DELETE_COMMENT_FAILURE:
            return {...state, fetching:false, fetched: false, error: action.payload};
            break;
        case postConstants.DELETE_COMMENT_SUCCESS:
            return {...state, fetching:false, fetched:true, comments: action.payload};
            break;
        default:
            return state;
    }
}