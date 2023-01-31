import {useInsertDataWithImage} from '../../customHooks/useInsertData';
import {
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
    GET_PRODUCT_DETAILS,
    GET_ALL_PRODUCTS, GET_PRODUCTS_BY_CATEGORY,

} from '../types'
import useGetData from './../../customHooks/useGetData';
import useDeleteData from './../../customHooks/useDeleteData';
import {useUpdateDataWithImage} from '../../customHooks/useUpdateData';


//create products with pagination
export const createProduct = (formatData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage("/api/products", formatData);
        dispatch({
            type: CREATE_PRODUCT,
            payload: {createdProduct: response, error: null},
            loading: true
        })

    } catch (e) {
        dispatch({
            type: CREATE_PRODUCT,
            payload: {createdProduct: [], error: `Error: ${e}`},
        })
    }
}

//get all products with pagination
export const getAllProducts = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?limit=${limit}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: {allProducts: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: {allProducts: [], error: `Error: ${e}`}
        })
    }
}

export const getAllProductsSearch = (queryString) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?${queryString}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: {allProducts: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: {allProducts: [], error: `Error: ${e}`}
        })
    }
}


//get all products with pagination with pages number
export const getAllProductsPage = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: {allProducts: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: {allProducts: [], error: `Error: ${e}`}
        })
    }
}

//get one product with id
export const getOneProduct = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products/${id}`);
        dispatch({
            type: GET_PRODUCT_DETAILS,
            payload: {product: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_PRODUCT_DETAILS,
            payload: {product: [], error: `Error: ${e}`},
        })
    }
}

//get one product with id
export const getProductsByCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/products?category=${id}`);
        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
            payload: {productsByCategory: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
            payload: {productsByCategory: [], error: `Error ${e}`},
        })
    }
}


//delete product with id
export const deleteProduct = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/products/${id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: {deleteProduct: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: DELETE_PRODUCT,
            payload: {deleteProduct: [], error: `Error: ${e}`},
        })
    }
}

//update product with id
export const updateProduct = (id, data) => async (dispatch) => {
    try {
        const response = await useUpdateDataWithImage(`/api/products/${id}`, data);
        dispatch({
            type: UPDATE_PRODUCT,
            payload: {updateProduct: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: {updateProduct: [], error: `Error: ${e}`},
        })
    }
}

