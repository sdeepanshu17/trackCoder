import { AUTH, END_LOADING, LOGOUT, START_LOADING, UPDATE } from "../constants/actionTypes";

export default (state={authData: null, user: null, isLoading: false},action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state,isLoading: true,};
        case END_LOADING:
            return {...state,isLoading: false,};
        case AUTH:
            console.log(action?.data);
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case UPDATE:
            localStorage.clear();
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        default:
            return state;
    }
}