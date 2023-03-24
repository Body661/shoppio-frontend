import {useInsertDataWithImage} from '../../customHooks/useInsertData';
import * as types from '../types';
import {useGetData} from '../../customHooks/useGetData';
import useDeleteData from './../../customHooks/useDeleteData';
import {useUpdateDataWithImage} from '../../customHooks/useUpdateData';


//create products with pagination
export const createProduct = (formatData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage("/api/products", formatData);
        dispatch({
            type: types.CREATE_PRODUCT,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: types.CREATE_PRODUCT,
            payload: e.response,
        })
    }
}

//get all products with pagination
export const getAllProducts = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?limit=${limit}`);
        dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: e.response,
        })
    }
}

export const getAllProductsSearch = (queryString) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?${queryString}`);
        dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: e.response,
        })
    }
}


//get all products with pagination with pages number
export const getAllProductsPage = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?page=${page}&limit=${limit}`);
        dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: e.response,
        })
    }
}

//get one product with id
export const getOneProduct = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products/${id}`);
        dispatch({
            type: types.GET_PRODUCT_DETAILS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_PRODUCT_DETAILS,
            payload: e.response,
        })
    }
}

export const getProductsByCategoryHome = (categoryID) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?limit=4&category=${categoryID}&sort=-sold&sort=-createdAt`);
        dispatch({
            type: types.GET_PRODUCTS_BY_CATEGORY_HOME,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_PRODUCTS_BY_CATEGORY_HOME,
            payload: e.response,
        })
    }
}

export const getProductsByCategory = (page, limit, categoryID) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?limit=${limit}&category=${categoryID}&page=${page}`);
        dispatch({
            type: types.GET_PRODUCTS_BY_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_PRODUCTS_BY_CATEGORY,
            payload: e.response,
        })
    }
}

export const getProductsByBrand = (page, limit, brandID) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?limit=${limit}&brand=${brandID}&page=${page}`);
        dispatch({
            type: types.GET_PRODUCTS_BY_BRAND,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.GET_PRODUCTS_BY_BRAND,
            payload: e.response,
        })
    }
}


//delete product with id
export const deleteProduct = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/products/${id}`);
        dispatch({
            type: types.DELETE_PRODUCT,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.DELETE_PRODUCT,
            payload: e.response,
        })
    }
}

//update product with id
export const updateProduct = (id, data) => async (dispatch) => {
    try {
        const response = await useUpdateDataWithImage(`/api/products/${id}`, data);
        dispatch({
            type: types.UPDATE_PRODUCT,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: types.UPDATE_PRODUCT,
            payload: e.response,
        })
    }
}

