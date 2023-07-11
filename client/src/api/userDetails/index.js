import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/users/' })

API.interceptors.request.use((config) => {
    const tok = JSON.parse(localStorage.getItem('profile'))?.token;
    if (tok) {
        config.headers.Authorization = `${tok}`;
    }
    return config;
});

export const signin = (formData) => API.post('signin', formData);
export const signup = (formData) => API.post('/signup', formData);
export const getUserDetails = (username) => API.get(`/profile/${username}`);
export const updateUserDetails = (formData) => API.patch(`/update`, formData);
export const userSubmissions = (username) => API.get(`/submissions/${username}`);
export const friendsSubmissions = () => API.get(`/friendsubmissions`);
export const friends = () => API.get(`/friends/username`);
export const toggleFriend = (friendUsername) => API.patch(`/friend/${friendUsername}`);