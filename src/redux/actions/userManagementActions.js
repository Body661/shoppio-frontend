import {useGetData, useGetDataToken} from "../../customHooks/useGetData";
import * as types from "../types"
import {useInsertData} from "../../customHooks/useInsertData";
import {useUpdateData} from "../../customHooks/useUpdateData";
import useDeleteData from "../../customHooks/useDeleteData";

export const getUsers = () => async (dispatch) => {
    try {
        const response = await useGetDataToken('/users?limit=50')
        dispatch({
            type: types.GET_ALL_USERS,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: types.GET_ALL_USERS,
            payload: e.response
        })
    }
}

export const getUsersPage = (page) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/users?limit=50&page=${page}`);
        dispatch({
            type: types.GET_ALL_USERS,
            payload: response
        });
    } catch (e) {
        dispatch({
            type: types.GET_ALL_USERS,
            payload: e.response
        });
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/users/${id}`)
        dispatch({
            type: types.GET_USER,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: types.GET_USER,
            payload: e.response
        })
    }
}

export const createUser = (data) => async (dispatch) => {
    try {
        const response = await useInsertData('/users', data)
        dispatch({
            type: types.CREATE_USER,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: types.CREATE_USER,
            payload: e.response
        })
    }
}

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/users/${id}`, data)
        dispatch({
            type: types.UPDATE_USER,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: types.UPDATE_USER,
            payload: e.response
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/users/${id}`)
        dispatch({
            type: types.DELETE_USER,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: types.DELETE_USER,
            payload: e.response
        })
    }
}