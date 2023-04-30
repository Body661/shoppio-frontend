import {CREATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES, GET_CATEGORY, UPDATE_CATEGORY} from '../types'
import {useGetData, useGetDataToken} from "../../customHooks/useGetData";
import {useInsertDataWithImage} from "../../customHooks/useInsertData";
import useDeleteData from "../../customHooks/useDeleteData";
import {useUpdateDataWithImage} from "../../customHooks/useUpdateData";

export const getAllCategories = (limit, searchTerm) => async (dispatch) => {
    try {
        const response = await useGetData(`/categories?limit=${limit}&${searchTerm}`)

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: e.response
        })
    }
}

export const getAllCategoriesPage = (page, searchTerm) => async (dispatch) => {
    try {
        const response = await useGetData(`/categories?limit=50&page=${page}&${searchTerm}`)

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: e.response
        })
    }
}

export const createCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage('/categories', data)
        dispatch({
            type: CREATE_CATEGORY,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: CREATE_CATEGORY,
            payload: e.response
        })
    }
}

export const getCategory = (categoryId) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/categories/${categoryId}`)
        dispatch({
            type: GET_CATEGORY,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: GET_CATEGORY,
            payload: e.response
        })
    }
}

export const updateCategory = (id, data) => async (dispatch) => {
    try {
        const response = await useUpdateDataWithImage(`/categories/${id}`, data)
        dispatch({
            type: UPDATE_CATEGORY,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: UPDATE_CATEGORY,
            payload: e.response
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/categories/${id}`)
        dispatch({
            type: DELETE_CATEGORY,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: DELETE_CATEGORY,
            payload: e.response
        })
    }
}