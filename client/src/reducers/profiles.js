import { CLEAR_PROFILES, END_LOADING, SET_AC_PROF, SET_CC_PROF, SET_CF_PROF, SET_CF_SUB, SET_FRND_SUB, SET_LC_PROF, SET_LC_SUB, SET_USER, SET_USER_SUB, START_LOADING } from "../constants/actionTypes";

export default (state={cfProfile: null, cfData: [], lcProfile: null, lcData: [], ccProfile: null, acProfile: null, userSubms: [], frndsSubms: [], frnds: [], user: null, isLoading: false},action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true, };
        case END_LOADING:
            return { ...state, isLoading: false,};
        case CLEAR_PROFILES:
            return {cfProfile: null, cfData: [], lcProfile: null, lcData: [], ccProfile: null, acProfile: null, userSubms: [], frndsSubms: [], isLoading: false, user: null};
        case SET_USER:
            // console.log(action.payload);
            return {...state, user: action.payload};
        case SET_CF_PROF:
            // console.log(action.payload);
            return {...state, cfProfile: action.payload};
        case SET_CF_SUB:
            // console.log(action.payload);
            return {...state, cfData: action.payload};
        case SET_LC_PROF:
            // console.log(action.payload);
            return {...state, lcProfile: action.payload};
        case SET_LC_SUB:
            // console.log(action.payload);
            return {...state, lcData: action.payload};
        case SET_CC_PROF:
            // console.log(action.payload);
            return {...state, ccProfile: action.payload};
        case SET_AC_PROF:
            // console.log(action.payload);
            return {...state, acProfile: action.payload};
        case SET_USER_SUB:
            // console.log(action.payload);
            return {...state, userSubms: action.payload};
        case SET_FRND_SUB:
            // console.log(action.payload);
            return {...state, frndsSubms: action.payload};
        default:
            return state;
    }
}