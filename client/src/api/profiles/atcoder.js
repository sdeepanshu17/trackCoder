import axios from 'axios';

const AC = axios.create({baseURL: 'http://localhost:5001/'});

export const acProf = (username) => AC.get(`/atcoder/users/${username}`);
export const acSubms = (username) => AC.get(`/atcoderkk/user/ac_rank?user=${username}`);
