import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        // apply authorization token to every http request if logged in
        axios.defaults.headers.common["Authorization"] = token;
    }
    else {
        // delete authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;