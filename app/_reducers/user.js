import {userConstants} from '../_constants';

export function currentUser(state = {
    user: {
        firstname: null,
        email: null,
        id: null,
        mediasLiked: [],
        mediasShared: [],
        players: [],
        postsLiked: [],
        postsShared: [],
        profilepicture: null,
        sexe: null,
        teams: [],
        teamsLiked: [],
        userType: null,
        lastname: null,
        birthdate: null,
        password: null,
        type: null,
        poste: null,
    },
    error: null,
    fetching: false,
    fetched: false,
}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case userConstants.LOGIN_SUCCESS:
            let newUser = Object.assign(state.user, action.user);
            return {...state, fetching: false, fetched: true, user: newUser};
            break;
        case userConstants.LOGIN_FAILURE:
            return {fetching: false, fetched: true, error: action.payload};

        case userConstants.PLAYER_ADD_STATS_REQUEST:
            return {...state, fecthing: true, fetch: false};
            break;
        case userConstants.PLAYER_ADD_STATS_SUCCESS:
            return {...state, fetching: false, fetched: true, user:action.user};
            break;
        case userConstants.PLAYER_ADD_STATS_FAILURE:
            return {...state, fetching: false, fetched: true, error: action.payload};
            break;

        case userConstants.USER_PUT_REQUEST:
            return {...state, fecthing: true, fetch: false};
            break;
        case userConstants.USER_PUT_SUCCESS:
            return {...state, fetching: false, fetched: true, user:action.user};
            break;
        case userConstants.USER_PUT_FAILURE:
            return {...state, fetching: false, fetched: true, error: action.payload};
            break;

        case userConstants.PUT_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case userConstants.PUT_SUCCESS:
            return {...state, fetching: false, fetched: true, user:action.payload};
            break;
        case userConstants.PUT_FAILURE:
            return {...state, fetching: false, fetched: false, error:action.payload};
            break;
        default:
            return state
    }
}

export function inspectedUser(state = {
    user: {
        firstname: null,
        email: null,
        id: null,
        mediasLiked: [],
        mediasShared: [],
        players: [],
        postsLiked: [],
        postsShared: [],
        profilepicture: null,
        sexe: null,
        teams: [],
        teamsLiked: [],
        userType: null,
        lastname: null,
        birthdate: null,
        password: null,
        type: null,
        poste: null,
    },
    error: null,
    fetching: false,
    fetched: false,
}, action) {
    switch (action.type) {
        case userConstants.INSPECT_USER_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case userConstants.INSPECT_USER_SUCCESS:
            let newUser = Object.assign(state.user, action.user);
            return {...state, fetching: false, fetched: true, user: newUser};
            break;
        case userConstants.INSPECT_USER_FAILURE:
            return {fetching: false, fetched: true, error: action.payload};
            break
        case userConstants.REMOVE_INSPECTED:
            return {...state, user: {}};
        default:
            return state;
    }
}

export function searchList(state = {
    user: [ ],
    error: null,
    fetching: false,
    fetched: false,
}, action) {
    switch (action.type) {
        case userConstants.SEARCH_REQUEST:
            return {...state, fetching: true, fetched: false};
            break;
        case userConstants.SEARCH_SUCCESS:
            return {...state, fetching: false, fetched: true, user: action.user};
            break;
        case userConstants.SEARCH_FAILURE:
            return {fetching: false, fetched: true, error: action.payload};
            break;
        default:
            return state;
    }
}