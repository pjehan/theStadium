import {postConstants} from '../_constants';

export function postList(state = {
    posts: [{
        id: null,
        owner: null,
        postType: null,
        medias: null,
        content: null,
        creationDate: null,
        postsLiked: null,
        comments: null,
        postsShared: null,
        goalsNbr: null,
        passNbr: null,
        title: null,
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

        case postConstants.ADD_COMMENT_SUCCESS:
            state.posts.posts[action.payload.postID].comments.push(action.payload.commentID);
            return {...state, fetching:false, fetched:true};
            break;
        case postConstants.DELETE_COMMENT_SUCCESS:
            const POST = state.posts.posts[action.payload.postID]
            POST.comments.splice(POST.comments.indexOf('/api/comments/' + action.payload.comment+1),1);
            return {...state, fetching:false, fetched:true};
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
    comments: [{
        user: {
            id:null,
            lastname: null,
            firstname: null,
            profilepicture: null,
            teams: null
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
            state.comments.comments.push(action.payload.comments);
            return {...state, fetching:false, fetched:true};
            break;
        // REMOVE
        case postConstants.DELETE_COMMENT_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case postConstants.DELETE_COMMENT_FAILURE:
            return {...state, fetching:false, fetched: false, error: action.payload};
            break;
        case postConstants.DELETE_COMMENT_SUCCESS:
            state.comments.comments.splice(action.payload.commentID,1);
            return {...state, fetching:false, fetched:true};
            break;
        default:
            return state;
    }
}