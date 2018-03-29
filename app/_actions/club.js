import {postConstants} from '../_constants';
import {postService} from '../_services';
import {alertActions} from './alert'
import {postConstants as clubConstants} from "../_constants/post";
import {clubService} from "../_services/club";
import {AsyncStorage} from "react-native";
export const clubAction = {
    getAll
};
function getAll() {

    return (dispatch) => {
        dispatch(request());
        clubService.getAll()
            .then(
                clubs => {
                    AsyncStorage.setItem('clubList', clubs);
                    console.log(
                        AsyncStorage.setItem('@appStore:clubList', clubs))
                    dispatch(success({clubs}))
                },error => {
                            console.error(error);
                            dispatch(failure(error));
                            dispatch(alertActions.error(error))
                        });

    }

    function request() {return { type: clubConstants.GETALL_REQUEST } }
    function success(posts) { return { type: clubConstants.GETALL_SUCCESS, payload: posts} }
    function failure(error) { return { type: clubConstants.GETALL_FAILURE, payload: error} }


}