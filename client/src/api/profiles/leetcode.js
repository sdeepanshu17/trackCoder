import axios from 'axios';

const LC = axios.create({baseURL: 'http://localhost:5001/'});

export const leetcodeSubm = (username) => LC.get(`/graphql?query=query {recentAcSubmissionList(username: "${username}", limit: 15) {id title titleSlug timestamp }}`);
export const leetcodeProfile = (username) => LC.get(`/graphql?query=query query {  matchedUser(username: "${username}") { username profile {  reputation ranking } submitStats { acSubmissionNum { difficulty count submissions }  } } userContestRanking(username: "${username}") { attendedContestsCount rating globalRanking totalParticipants topPercentage } recentAcSubmissionList(username: "${username}", limit: 15){ title titleSlug timestamp} }`);