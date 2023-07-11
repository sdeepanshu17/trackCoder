import * as api from "../api/userDetails";
import { AUTH, END_LOADING, START_LOADING, UPDATE, USERDETAILS, SET_USER_SUB, SET_FRND_SUB, SET_FRNDS, REMOVE_FRND } from "../constants/actionTypes";
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

export const signin = (formData, history, setErrorMessage) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, data });
        dispatch({type: END_LOADING});
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
        dispatch({type: START_LOADING});
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });
        dispatch({type: END_LOADING});
        history("/");
    } catch (error) {
        dispatch({type: END_LOADING});
        setErrorMessage(error.response.data.message);
        console.log(error);
    }
}

export const getUserDetails = (username) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.getUserDetails(username);
        dispatch({ type: USERDETAILS, data });
        dispatch({type: END_LOADING});
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

export const getFriendsSubmissions = (username) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.friendsSubmissions(username);
        dispatch({ type: SET_FRND_SUB, payload: data?.result });
        dispatch({type: END_LOADING});
    } catch (error) {
        dispatch({type: END_LOADING});
        console.log(error);
    }
}

export const getFriends = (username) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.friends(username);
        dispatch({ type: SET_FRNDS, payload: data?.result });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const removeFriend = (username,friendUsername) => async (dispatch) => {
    try {
        // dispatch({type: START_LOADING});
        const {data} = await api.removeFriend(username,friendUsername);
        dispatch({ type: REMOVE_FRND, payload: data?.result });
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}