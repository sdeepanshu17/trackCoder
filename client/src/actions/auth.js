import * as api from "../api/userDetails";
import { AUTH, END_LOADING, START_LOADING, UPDATE, USERDETAILS, SET_USER_SUB } from "../constants/actionTypes";
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

export const signin = (formData, history, setErrorMessage) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, data });
        history("/");
        // toast.success("Welcome back!");
    } catch (error) {
        dispatch({type: END_LOADING});
        // toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
        console.log(error);
    }
}

export const signup = (formData, history, setErrorMessage) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });
        history("/");
    } catch (error) {
        dispatch({type: END_LOADING});
        setErrorMessage(error.response.data.message);
        console.log(error);
    }
}

export const getUserDetails = (username) => async (dispatch) => {
    try {
        const { data } = await api.getUserDetails(username);
        dispatch({ type: USERDETAILS, data });
    } catch (error) {
        dispatch({type: END_LOADING});
        console.log(error);
    }
}

export const updateUserDetails = (username, formData, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.updateUserDetails(username, formData);
        dispatch({ type: UPDATE, data });
        dispatch({type: END_LOADING});
        history(0);
    } catch (error) {
        dispatch({type: END_LOADING});
        console.log(error);
    }
}

export const getUserSubmission = (username) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.userSubmissions(username);
        dispatch({ type: SET_USER_SUB, payload: data?.result });
        dispatch({type: END_LOADING});
    } catch (error) {
        dispatch({type: END_LOADING});
        console.log(error);
    }
}