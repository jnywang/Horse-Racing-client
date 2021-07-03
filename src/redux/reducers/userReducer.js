import {
    LOADING_USER,
    AUTHENTICATE,
    LOGIN_ERROR,
    SET_EMPLOYEE,
    LOGOUT,
    SIGNUP_USER,
    SIGNUP_ERROR
} from '../types';

const initialState = {
    username: "",
    user: {},       // Signup info, includes username, password, name, address, fee, type
    authenticated: false,
    loading: false,
    loginError: false,
    signupError: false,
    isEmployee: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case AUTHENTICATE:
            return {
                ...state,
                loading: false,
                authenticated: true,
                loginError: false,
                username: action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                loginError: true
            };
        case SET_EMPLOYEE:
            return {
                ...state,
                isEmployee: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                authenticated: false
            }
        case SIGNUP_USER:
            return {
                ...state,
                username: action.payload.username,
                user: action.payload,
                signupError: false
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                signupError: true
            };
        default:
            return state;
    }
}
