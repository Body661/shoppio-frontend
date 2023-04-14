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
import {useUpdateData} from '../../customHooks/useUpdateData'


//add user Address
export const addUserAddress = (body) => async (dispatch) => {
    try {
        const response = await useInsertData("/addresses", body);
        dispatch({
            type: ADD_USER_ADDRESS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ADD_USER_ADDRESS,
            payload: e.response,
        })
    }
}

//get all user Address
export const getAllUserAddresses = () => async (dispatch) => {
    try {
        const response = await useGetDataToken('/addresses');

        dispatch({
            type: GET_ALL_USER_ADDRESSES,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_USER_ADDRESSES,
            payload: e.response,
        })
    }
}


//delete user Address
export const deleteUserAddress = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/addresses/${id}`);

        dispatch({
            type: DELETE_USER_ADDRESS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: DELETE_USER_ADDRESS,
            payload: e.response,
        })
    }
}


//get one user Address
export const getOneUserAddress = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/addresses/${id}`);
        dispatch({
            type: GET_ONE_USER_ADDRESS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_USER_ADDRESS,
            payload: e.response,
        })
    }
}


//edit user Address
export const editUserAddress = (id, body) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/addresses/${id}`, body);

        dispatch({
            type: EDIT_USER_ADDRESS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: EDIT_USER_ADDRESS,
            payload: e.response,
        })
    }
}