import * as cfapi from "../api/profiles/codeforces";
import * as lcapi from "../api/profiles/leetcode";
import * as ccapi from "../api/profiles/codechef";
import * as acapi from "../api/profiles/atcoder";
import { START_LOADING, END_LOADING, SET_CF_PROF, SET_CF_SUB, SET_LC_SUB, SET_LC_PROF, SET_CC_PROF, SET_AC_PROF, CLEAR_PROFILES } from "../constants/actionTypes";
import cheerio from "cheerio";

export const getCFSubmissions = (cfUsername) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        let { data } = await cfapi.codeforcesSubm(cfUsername);
        dispatch({ type: SET_CF_SUB, payload: data?.result });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getCFProfile = (cfUsername) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        let { data } = await cfapi.codeforcesProf(cfUsername);
        dispatch({ type: SET_CF_PROF, payload: data?.result });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getLCSubmissions = (lcUsername) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        let { data } = await lcapi.leetcodeSubm(lcUsername);
        dispatch({ type: SET_LC_SUB, payload: data.data.recentAcSubmissionList });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getLCProfile = (lcUsername) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        let { data } = await lcapi.leetcodeProfile(lcUsername);
        dispatch({ type: SET_LC_PROF, payload: data.data });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getCCProfile = (ccUsername) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        let {data} = await ccapi.codechefProf(ccUsername);
        const $ = cheerio.load(data);
        const username = $('.m-username--link').text().trim();
        // const rating = $('.rating-number').text().trim();
        const rating = $('.rating-number').contents().get(0).nodeValue.trim();
        const maxRating = $('.rating-header.text-center').find('small').text().trim().match(/\d+/)[0];
        const globalRank = $('.rating-ranks li:nth-child(1) strong').text().trim();
        const fullySolvedCount = $('.rating-data-section.problems-solved').find('h5').text().match(/\(.*?\)/)[0].replace(/\D/g, '');
        const ccData = {username, rating, maxRating, globalRank, fullySolvedCount};
        dispatch({ type: SET_CC_PROF, payload: ccData });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getACProfile = (acUsername) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        let {data} = await acapi.acProf(acUsername);
        // let data1 = await acapi.acSubms(acUsername);
        // console.log(data1);
        const $ = cheerio.load(data);
        const username = acUsername;
        const rating = $('.dl-table tr:nth-child(2) td span.user-green').text();
        const maxRating = $('.dl-table tr:nth-child(3) td span.user-green').text();
        const globalRank = $('.dl-table tr:nth-child(1) td').text().replace(/[^0-9]/g, '');
        const fullySolvedCount = 0;
        const acData = {username, rating, maxRating, globalRank, fullySolvedCount};
        dispatch({ type: SET_AC_PROF, payload: acData });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const clearProfiles = () => async(dispatch) => {
    try {
        dispatch({ type: CLEAR_PROFILES, data: null });
    } catch (error) {
        console.log(error);
    }
}