import {clubConstants, userConstants} from '../_constants';

export function clubList(state = {
    id: null,
    name: null,
    profilePicture:null
}, action) {
    switch (action.type) {
        case clubConstants.GETALL_CLUB_REQUEST:
            return {...state};
            break;
        case clubConstants.GETALL_CLUB_SUCCESS:
            return {...state};
            break;
        case clubConstants.GETALL_CLUB_FAILURE:
            return {};
        default:
            return state
    }
}
