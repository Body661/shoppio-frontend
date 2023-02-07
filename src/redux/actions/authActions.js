import {
    CREATE_NEW_USER,
    RESET_PASSWORD,
    VERIFY_PASSWORD,
    FORGET_PASSWORD,
    GET_CURRENT_USER,
    LOGIN_USER,
    UPDATE_USER_PASSWORD, UPDATE_USER_PROFILE
} from '../types'

import {useInsertData} from '../../customHooks/useInsertData'
import {useGetDataToken} from '../../customHooks/useGetData';
import {useInsUpdateData} from '../../customHooks/useUpdateData';

//create new user
export const createNewUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/auth/signup`, data);
        dispatch({
            type: CREATE_NEW_USER,
            payload: {user: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: CREATE_NEW_USER,
            payload: {user: [], error: e.response},
        })
    }
}

//login  user
export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/auth/login`, data);
        dispatch({
            type: LOGIN_USER,
            payload: {user: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: LOGIN_USER,
            payload: {user: [], error: e.response},
        })
    }
}

//login  user
export const getLoggedUser = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/users/me`);
        dispatch({
            type: GET_CURRENT_USER,
            payload: {user: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_CURRENT_USER,
            payload: {user: [], error: e.response},
        })
    }
}


//1- forget password
export const forgetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/auth/forgetpassword`, data);
        dispatch({
            type: FORGET_PASSWORD,
            payload: {forgetPassword: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: FORGET_PASSWORD,
            payload: {forgetPassword: [], error: e.response},
        })
    }
}


//2- verify password
export const verifyPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/auth/verifyPassResetCode`, data);
        dispatch({
            type: VERIFY_PASSWORD,
            payload: {verifyPassword: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: VERIFY_PASSWORD,
            payload: {verifyPassword: [], error: e.response},
        })
    }
}


//2- reset password
export const resetPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/auth/resetPassword`, data);
        dispatch({
            type: RESET_PASSWORD,
            payload: {resetPassword: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: RESET_PASSWORD,
            payload: {resetPassword: [], error: e.response},
        })
    }
}

//update  user data
export const updateUserProfileData = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/users/me`, body);
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: {profile: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: {profile: [], error: null},
        })
    }
}


//update  user password
export const updateUserPassword = (body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/users/updateMyPassword`, body);
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: {password: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: UPDATE_USER_PASSWORD,
            payload: {password: [], error: e.response},
        })
    }
}