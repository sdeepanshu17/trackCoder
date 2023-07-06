import axios from 'axios';

const CC = axios.create({baseURL: 'http://localhost:5001/codechef'});

export const codechefProf = (username) => CC.get(`/users/${username}`);