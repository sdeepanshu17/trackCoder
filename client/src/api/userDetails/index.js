import axios from 'axios';
import {BASE_URL} from "../../constants/api"

const API = axios.create({ baseURL: BASE_URL })

API.interceptors.request.use((config) => {
    const tok = JSON.parse(localStorage.getItem('profile'))?.token;
    if (tok) {
        config.headers.Authorization = `${tok}`;
    }
    return config;
});

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const getUserDetails = (username) => API.get(`/users/profile/${username}`);
export const updateUserDetails = (formData) => API.patch(`/users/update`, formData);
export const userSubmissions = (username) => API.get(`/users/submissions/${username}`);
export const friendsSubmissions = () => API.get(`/users/friendsubmissions`);
export const friends = () => API.get(`/users/friends/username`);
export const toggleFriend = (friendUsername) => API.patch(`/users/friend/${friendUsername}`);