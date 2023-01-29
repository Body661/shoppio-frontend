import {CREATE_CATEGORY, GET_ALL_CATEGORIES} from '../types'
import useGetData from "../../customHooks/useGetData";
import {useInsertDataWithImage} from "../../customHooks/useInsertData";

export const getAllCategories = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/categories?limit=${limit}`)

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {categories: response, error: null}
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {categories: [], error: `ERROR: ${e}`},
        })
    }
}

export const getAllCategoriesPage = (page) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/categories?limit=6&page=${page}`)

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {categories: response, error: null}
        })
    } catch (e) {
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {categories: [], error: `ERROR: ${e}`},
        })
    }
}

export const createCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage('/api/categories', data)
        dispatch({
            type: CREATE_CATEGORY,
            payload: {categories: response, error: null}
        })
    } catch (e) {
        dispatch({
            type: CREATE_CATEGORY,
            payload: {categories: [], error: `ERROR: ${e}`},
        })
    }
}