import {useInsertData} from "../../customHooks/useInsertData";
import * as types from "../types";
import {useGetData} from "../../customHooks/useGetData";
import {useUpdateData} from "../../customHooks/useUpdateData";
import useDeleteData from "../../customHooks/useDeleteData";

export const createSubcategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/categories/${data.categoryId}/subcategories`, {name: data.name})
        dispatch({
            type: types.CREATE_SUBCATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: types.CREATE_SUBCATEGORY,
            payload: e.response,
        })
    }
}

export const getSubcategories = (page, searchTerm) => async (dispatch) => {
    try {
        const response = await useGetData(`/subcategories?limit=50&${page}&${searchTerm}`);

        dispatch({
            type: types.GET_ALL_SUBCATEGORIES,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_ALL_SUBCATEGORIES,
            payload: e.response,
        })
    }
}

export const getSubcategoriesOfCategory = (categoryId, page, searchTerm) => async (dispatch) => {
    try {
        const response = await useGetData(`/categories/${categoryId}/subcategories?${searchTerm}&${page}`);

        dispatch({
            type: types.GET_ALL_SUBCATEGORIES,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_ALL_SUBCATEGORIES,
            payload: e.response,
        })
    }
}

export const getSubcategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/subcategories/${id}`);

        dispatch({
            type: types.GET_SUBCATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_SUBCATEGORY,
            payload: e.response,
        })
    }
}

export const updateSubcategory = (id, body) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/subcategories/${id}`, body);

        dispatch({
            type: types.UPDATE_SUBCATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.UPDATE_SUBCATEGORY,
            payload: e.response,
        })
    }
}

export const deleteSubcategory = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/subcategories/${id}`);

        dispatch({
            type: types.DELETE_SUBCATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.DELETE_SUBCATEGORY,
            payload: e.response,
        })
    }
}