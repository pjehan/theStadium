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