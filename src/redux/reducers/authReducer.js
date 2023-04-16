import * as types from '../types';

const initialState = {
    createUser: null,
    loginUser: null,
    currentUser: null,
    forgetPassword: null,
    verifyPassword: null,
    resetPassword: null,
    updateProfile: null,
    userChangePassword: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_USER:
            return { ...state, createUser: action.payload };
        case types.LOGIN_USER:
            return { ...state, loginUser: action.payload };
        case types.GET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        case types.FORGET_PASSWORD:
            return { ...state, forgetPassword: action.payload };
        case types.VERIFY_PASSWORD:
            return { ...state, verifyPassword: action.payload };
        case types.RESET_PASSWORD:
            return { ...state, resetPassword: action.payload };
        case types.UPDATE_USER_PROFILE:
            return { ...state, updateProfile: action.payload };
        case types.UPDATE_USER_PASSWORD:
            return { ...state, userChangePassword: action.payload };
        default:
            return state;
    }
};

export default authReducer;
