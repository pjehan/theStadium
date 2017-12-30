import { postConstants } from '../_constants';

export function postList(state={}, action) {
    switch(action.type) {
        case postConstants.ADD_POST_REQUEST:
            return {};
            break;
        case postConstants.ADD_POST_SUCCESS:
            return state;
            break;
        case postConstants.GETALL_POSTS_SUCCESS:
            return state;
            break;
    }
}