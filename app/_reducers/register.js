import { userConstants } from '../_constants';

export function registeringUser(state = {
    firstname:null,
    lastname:null,
    birthdate: null,
    password: null,
    email:null,
    userType:null,
    sexe:null,
    club:'',
    team: null,
    error: '',
    poste: '',
    fetching: false,
    done: false,
}, action) {
  switch (action.type) {
    case userConstants.REGISTER_ADD_INFOS_REQUEST:
        return {...state};
        break;
    case userConstants.REGISTER_ADD_INFOS_SUCCESS:
        return {...state};
        break;
    case userConstants.REGISTER_ADD_INFOS_FAILURE:
      return {};
      case userConstants.REGISTER_REQUEST:
        return {...state, fetching:true};
        break;
    case userConstants.REGISTER_SUCCESS:
        return {...state, fetching:false,done:true};
        break;
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}
