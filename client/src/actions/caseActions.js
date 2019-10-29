import axios from "axios";
import {ADD_CASE, CASE_UPDATED, CASE_UPDATING, CASES_LOADED, CASES_LOADING} from "./constants";
import {returnErrors} from "./errorActions";
import {handleError, tokenConfig} from "./authActions";


const connectionString = 'http://localhost:4000';

export const addCase = c => {
    return (dispatch, getState) => {
        const body = JSON.stringify(c);
        axios
            .post(`${connectionString}/api/case/add`, body, tokenConfig(getState))
            .then(res => dispatch({
                type: ADD_CASE,
                payload: res.data
            }))
            .catch(err =>
                handleError(dispatch, err)
            );
    };
};

export const updateCase = c => {
    return (dispatch, getState) => {
        dispatch({type: CASE_UPDATING});

        const body = JSON.stringify(c);
        axios
            .put(`${connectionString}/api/case/update/${id}`, body, tokenConfig(getState))
            .then(res => dispatch({
                type: CASE_UPDATED,
                payload: res.data
            }))
            .catch(err =>
                handleError(dispatch, err)
            );
    };
};

export const getCases = (state) => {
    return (dispatch, getState) => {
        dispatch({type: CASES_LOADING});
        const body = JSON.stringify(state);
        axios
            .get(`${connectionString}/api/case/list/${state}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: CASES_LOADED,
                    payload: res.data
                })
            })
            .catch(err =>
                handleError(dispatch, err)
            );
    };
};

export const getCasesById = (id) => {
    return (dispatch, getState) => {
        axios
            .get(`${connectionString}/api/case/${id}`, body, tokenConfig(getState))
            .then(() => dispatch({
                type: CASES_LOADING,
            }))
            .catch(err =>
                handleError(dispatch, err)
            );
    };
};

export const updateCaseStatus = (case_id, user_id, state) => {
    return (dispatch, getState) => {
        dispatch({type: CASE_UPDATING});
        const body = JSON.stringify({
            "user_id": user_id,
            state,
        });

        axios
            .put(`${connectionString}/api/case/updateCaseState/${case_id}`, body, tokenConfig(getState))
            .then(res => dispatch({
                type: CASE_UPDATED
            }))
            .then(() => {
                dispatch(getCases(0));
            })
            .catch(err =>
                handleError(dispatch, err)
            );
    }
};