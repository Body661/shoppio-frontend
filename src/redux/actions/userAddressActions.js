import {useGetDataToken} from '../../customHooks/useGetData';
import {useInsertData} from '../../customHooks/useInsertData';
import {
    ADD_USER_ADDRESS,
    EDIT_USER_ADDRESS,
    GET_ONE_USER_ADDRESS,
    DELETE_USER_ADDRESS,
    GET_ALL_USER_ADDRESSES
} from '../types'
import useDeleteData from '../../customHooks/useDeleteData';
import {useInsUpdateData} from '../../customHooks/useUpdateData'


//add user Address
export const addUserAddress = (body) => async (dispatch) => {
    try {
        const response = await useInsertData("/api/addresses", body);
        dispatch({
            type: ADD_USER_ADDRESS,
            payload: {address: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: ADD_USER_ADDRESS,
            payload: {address: [], error: e.response},
        })
    }
}

//get all user Address
export const getAllUserAddresses = () => async (dispatch) => {
    try {
        const response = await useGetDataToken('/api/addresses');

        dispatch({
            type: GET_ALL_USER_ADDRESSES,
            payload: {allAddresses: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_USER_ADDRESSES,
            payload: {allAddresses: [], error: e.response},
        })
    }
}


//delete user Address
export const deleteUserAddress = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/addresses/${id}`);

        dispatch({
            type: DELETE_USER_ADDRESS,
            payload: {address: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: DELETE_USER_ADDRESS,
            payload: {address: [], error: e.response},
        })
    }
}


//get one user Address
export const getOneUserAddress = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/addresses/${id}`);
        dispatch({
            type: GET_ONE_USER_ADDRESS,
            payload: {address: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_USER_ADDRESS,
            payload: {address: [], error: e.response},
        })
    }
}


//edit user Address
export const editUserAddress = (id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/addresses/${id}`, body);

        dispatch({
            type: EDIT_USER_ADDRESS,
            payload: {address: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: EDIT_USER_ADDRESS,
            payload: {address: [], error: e.response},
        })
    }
}