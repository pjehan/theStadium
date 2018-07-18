import {clubConstants, userConstants} from '../_constants';

export function clubList(state = {} , action) {
    switch (action.type) {
        case clubConstants.GETALL_CLUB_REQUEST:
            return {...state};
            break;
        case clubConstants.GETALL_CLUB_SUCCESS:
            return state = action.payload.clubs;
            break;
        case clubConstants.GETALL_CLUB_FAILURE:
            return {};
        default:
            return state
    }
}
