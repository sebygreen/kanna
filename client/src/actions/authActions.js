import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "./types";

// register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login')) // redirect to login page after register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// login - get user token and set it
export const loginUser = (userData) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // save to local storage
            const token = res.data;
            localStorage.setItem('jwt-token', token.token);
            setAuthToken(token.token);
            try {
                const decoded = jwt_decode(token.token);
                dispatch(setCurrentUser(decoded));
            } catch(error) {
                console.log(error);
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


// user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwt-token'); // remove token from local storage
    setAuthToken(false); // remove auth header
    dispatch(setCurrentUser({})); // user is an empty object -> isAuthenticated = false
}