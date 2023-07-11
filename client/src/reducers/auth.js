import { AUTH, END_LOADING, LOGOUT, REMOVE_FRND, START_LOADING, UPDATE, USERDETAILS } from "../constants/actionTypes";

export default (state={authData: null, isLoading: false},action) => {
    switch (action.type) {
        case START_LOADING:
            // console.log("true");
            return {...state,isLoading: true,};
            case END_LOADING:
            // console.log("false");
            return {...state,isLoading: false,};
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state,authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state,authData: null};
        case USERDETAILS:
            return {...state, user: action?.data};
        case REMOVE_FRND:
            return {...state, user: action?.data};
        case UPDATE:
            localStorage.clear();
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state, user: action?.data};
        default:
            return state;
    }
}