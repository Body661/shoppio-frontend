import {
    CREATE_NEW_USER,
    RESET_PASSWORD,
    VERIFY_PASSWORD,
    GET_CURRENT_USER,
    LOGIN_USER,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PROFILE,
    FORGOT_PASSWORD
} from '../types'
import {useInsertData} from "../../customHooks/useInsertData";
import {useGetDataToken} from "../../customHooks/useGetData";
import {useUpdateData} from "../../customHooks/useUpdateData";


// Action creators

export const createNewUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/auth/signup`, data);
        dispatch({ type: CREATE_NEW_USER, payload: response })
    } catch (error) {
        dispatch({ type: CREATE_NEW_USER, payload: error.response })
    }
}

export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/auth/login`, data);
        dispatch({ type: LOGIN_USER, payload: response })
    } catch (error) {
        dispatch({ type: LOGIN_USER, payload: error.response  })
    }
}

export const getLoggedUser = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/users/me`);
        dispatch({ type: GET_CURRENT_USER, payload: response })
    } catch (error) {
        dispatch({ type: GET_CURRENT_USER, payload: error.response  })
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/auth/forgot-password`, data);
        dispatch({ type: FORGOT_PASSWORD, payload: response })
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD, payload: error.response  })
    }
}

export const verifyPassword = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/auth/verify-password-reset-code`, data);
        dispatch({ type: VERIFY_PASSWORD, payload: response })
    } catch (error) {
        dispatch({ type: VERIFY_PASSWORD, payload: error.response  })
    }
}

export const resetPassword = (data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/auth/reset-password`, data);
        dispatch({ type: RESET_PASSWORD, payload: response })
    } catch (error) {
        dispatch({ type: RESET_PASSWORD, payload: error.response  })
    }
}

export const updateUserProfileData = (body) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/users/me`, body);
        dispatch({ type: UPDATE_USER_PROFILE, payload: response })
    } catch (error) {
        dispatch({ type: UPDATE_USER_PROFILE, payload: error.response  })
    }
}

export const updateUserPassword = (body) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/users/my-password`, body);
        dispatch({ type: UPDATE_USER_PASSWORD, payload: response })
    } catch (error) {
        dispatch({ type: UPDATE_USER_PASSWORD, payload: error.response  })
    }
}