
export const clubService = {
    getAll
};
import axios from 'axios';

function getAll() {
    return axios.get("http://192.168.43.103:8001/api/clubs")
        .then(response => {
            console.log(response)
            return response.data["hydra:member"];
        }).catch((error) => {
            console.error(error);
        });
}