import instance from "../config/axiosConfig";

export const teamService = {
    addUser
};

function addUser(userID, teamID, userStatus) {
    return instance.post("/api/team_has_users", {
        startDate: "2018-04-05T11:52:21.006Z",
        endDate: "2018-04-05T11:52:21.006Z",
        user: userID,
        team: teamID,
        status: userStatus
    })
        .then(response => {
            console.log(response);
            return response
        }).catch((error) => {
            return error;
        });
}