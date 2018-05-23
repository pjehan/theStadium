
export const clubService = {
    getAll
};import instance from "../config/axiosConfig";

function getAll() {
    return instance.get("/api/clubs")
        .then(response => {
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}