
import {alertActions} from './alert'
import {clubConstants} from "../_constants/club";
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
                    AsyncStorage.setItem('clubList', JSON.stringify(clubs));
                    dispatch(success({clubs}))
                },error => {
                            console.error(error);
                            dispatch(failure(error));
                            dispatch(alertActions.error(error))
                        });

    }

    function request() {return { type: clubConstants.GETALL_CLUB_REQUEST } }
    function success(clubs) { return { type: clubConstants.GETALL_CLUB_SUCCESS, payload: clubs} }
    function failure(error) { return { type: clubConstants.GETALL_CLUB_FAILURE, payload: error} }


}

function update() {
    return (dispatch) => {
        dispatch(request());
        clubService.update()
            .then(
                clubs => {
                    dispatch(success({clubs}))
                },error => {
                    console.error(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                });

    };

}