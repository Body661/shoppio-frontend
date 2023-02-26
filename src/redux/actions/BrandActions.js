import {GET_ALL_BRANDS, CREATE_BRAND} from '../types';
import {useGetData} from '../../customHooks/useGetData';
import {useInsertDataWithImage} from '../../customHooks/useInsertData';

export const getAllBrands = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/brands?limit=${limit}`);
        dispatch({type: GET_ALL_BRANDS, payload: response});
    } catch (error) {
        dispatch({type: GET_ALL_BRANDS, payload: error.response});
    }
};

export const getAllBrandsPage = (page) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/brands?limit=4&page=${page}`);
        dispatch({type: GET_ALL_BRANDS, payload: response});
    } catch (error) {
        dispatch({type: GET_ALL_BRANDS, payload: error.response});
    }
};

export const createBrand = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/api/brands`, formData);
        dispatch({type: CREATE_BRAND, payload: response});
    } catch (error) {
        dispatch({type: CREATE_BRAND, payload: error.response});
    }
};
