import { userConstants } from '../_constants';

export function registeringUser(state = {
    firstname:'',
    lastname:'',
    birthdate: '',
    password: '',
    email:'',
    type:null,
    sexe:0,
    club:'',
    team: '',
    error: '',
    poste: '',
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
    default:
      return state
  }
}
