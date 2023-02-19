import {GET_ALL_BRANDS, CREATE_BRAND, GET_ONE_BRAND} from '../types'
import {useGetData} from '../../customHooks/useGetData'
import {useInsertDataWithImage} from '../../customHooks/useInsertData'

//get all Brand
export const getAllBrands = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/brands?limit=${limit}`);

        dispatch({
            type: GET_ALL_BRANDS,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_BRANDS,
            payload: e.response
        })
    }
}

//get all Brand with pagination
export const getAllBrandsPage = (page) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/brands?limit=4&page=${page}`);
        dispatch({
            type: GET_ALL_BRANDS,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_BRANDS,
            payload: e.response
        })
    }
}

export const getOneBrand = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/brands/${id}`);

        dispatch({
            type: GET_ONE_BRAND,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_BRAND,
            payload: e.response
        })
    }
}

//insert brand with pagination
export const createBrand = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/api/brands`, formData);
        dispatch({
            type: CREATE_BRAND,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: CREATE_BRAND,
            payload: e.response
        })
    }
}