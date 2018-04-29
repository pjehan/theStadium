
import {teamService} from "../_services/team";
import {userConstants} from "../_constants/user";

export const teamAction = {
    addUser,
    putTeam
};

function addUser(userID, teamID, userStatus){
    return dispatch => {

        dispatch(request(userID, teamID, userStatus));
        teamService.addUser(userID,teamID,userStatus)
            .then(
                user => {
                    dispatch(success(user));
                    return user;
                }
            )
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function putTeam(teamID, team){
    return dispatch => {

        teamService.putTeam(teamID,team)
            .then(
                user => {
                    dispatch(success(user));
                    return user;
                }
            )
    }

}