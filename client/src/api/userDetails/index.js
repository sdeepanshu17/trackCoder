import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5001/'})

export const signin = (formData) => API.post('/users/signin',formData);
export const signup = (formData) => API.post('/users/signup',formData);
export const getUserDetails = (username) => API.get(`/users/${username}`);
export const updateUserDetails = (username, formData) => API.patch(`/users/update/${username}`,formData);
export const userSubmissions = (username) => API.get(`/users/submissions/${username}`);
export const friendsSubmissions = (username) => API.get(`/users/friendsubmissions/${username}`);