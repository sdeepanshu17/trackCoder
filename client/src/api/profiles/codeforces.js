import axios from 'axios';

const CF = axios.create({baseURL: 'https://codeforces.com/api/'});

export const codeforcesSubm = (username) => CF.get(`/user.status?handle=${username}`);
export const codeforcesProf = (username) => CF.get(`/user.info?handles=${username}`);