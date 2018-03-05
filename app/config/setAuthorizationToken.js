import axios from 'axios';
export default function setAuthorizationToken(token) {

    if(token){
        axios.defaults.headers.comment['Authorization'] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.comment['Authorization'];
    }
}