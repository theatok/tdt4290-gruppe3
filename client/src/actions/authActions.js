import axios from 'axios';
import {clearErrors, returnErrors} from "./errorActions";

import {AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCESS, USER_LOADED, USER_LOADING} from "../actions/constants";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // Set state to user loading
    dispatch({type: USER_LOADING});
    axios
        .get('http://localhost:4000/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({email, password});
    console.log(body);
    axios
        .post('http://localhost:4000/api/auth/login', body, config)
        .then(res => {
            dispatch(clearErrors());
            dispatch({
                type: LOGIN_SUCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        })
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};