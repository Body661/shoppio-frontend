import {GET_ALL_BRANDS, CREATE_BRAND, GET_BRAND, UPDATE_BRAND, DELETE_BRAND} from '../types';
import {useGetData} from '../../customHooks/useGetData';
import {useInsertDataWithImage} from '../../customHooks/useInsertData';
import {useUpdateDataWithImage} from "../../customHooks/useUpdateData";
import useDeleteData from "../../customHooks/useDeleteData";

export const getAllBrands = (limit, searchTerm) => async (dispatch) => {
    try {
        const response = await useGetData(`/brands?limit=${limit}&${searchTerm}`);
        dispatch({type: GET_ALL_BRANDS, payload: response});
    } catch (error) {
        dispatch({type: GET_ALL_BRANDS, payload: error.response});
    }
};

export const getAllBrandsPage = (page, searchTerm) => async (dispatch) => {
    try {
        const response = await useGetData(`/brands?limit=50&page=${page}&${searchTerm}`);
        dispatch({type: GET_ALL_BRANDS, payload: response});
    } catch (error) {
        dispatch({type: GET_ALL_BRANDS, payload: error.response});
    }
};

export const createBrand = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/brands`, formData);
        dispatch({type: CREATE_BRAND, payload: response});
    } catch (error) {
        dispatch({type: CREATE_BRAND, payload: error.response});
    }
};

export const getBrand = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/brands/${id}`);
        dispatch({type: GET_BRAND, payload: response});
    } catch (error) {
        dispatch({type: GET_BRAND, payload: error.response});
    }
}

export const updatedBrand = (id, formData) => async (dispatch) => {
    try {
        const response = await useUpdateDataWithImage(`/brands/${id}`, formData);
        dispatch({type: UPDATE_BRAND, payload: response});
    } catch (error) {
        dispatch({type: UPDATE_BRAND, payload: error.response});
    }
};

export const deleteBrand = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/brands/${id}`)
        dispatch({
            type: DELETE_BRAND,
            payload: response
        })
    } catch (e) {
        dispatch({
            type: DELETE_BRAND,
            payload: e.response
        })
    }
}