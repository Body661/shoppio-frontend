import {
    ADD_TO_CART,
    GET_USER_CART,
    CLEAR_USER_CART,
    UPDATE_ITEM_IN_CART,
    DELETE_ITEM_FROM_CART,
    APPLY_CART_COUPON
} from '../types'

import {useGetDataToken} from '../../customHooks/useGetData'
import {useInsertData} from '../../customHooks/useInsertData';
import useDeleteData from '../../customHooks/useDeleteData';
import {useInsUpdateData} from '../../customHooks/useUpdateData'
//add to cart
export const addProductToCart = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/cart`, body);
        dispatch({
            type: ADD_TO_CART,
            payload: {response, error: null},
        })

    } catch (e) {
        dispatch({
            type: ADD_TO_CART,
            payload: {response: null, error: e.response},
        })
    }
}


//get all cart items
export const getAllUserCartItems = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/cart`);
        dispatch({
            type: GET_USER_CART,
            payload: {response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_USER_CART,
            payload: {response: null, error: e.response},
        })
    }
}

//clearAll cart Item
export const clearAllCartItem = () => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/cart`);
        dispatch({
            type: CLEAR_USER_CART,
            payload: {response, error: null},
        })

    } catch (e) {
        dispatch({
            type: CLEAR_USER_CART,
            payload: {response: null, error: e.response},
        })
    }
}
//delete cart Item
export const deleteCartItem = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/cart/${id}`);

        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: {response, error: null},
        })

    } catch (e) {
        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: {response: null, error: e.response},
        })
    }
}

//update cart Item
export const updateCartItem = (id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/cart/${id}`, body);
        dispatch({
            type: UPDATE_ITEM_IN_CART,
            payload: {response, error: null},
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ITEM_IN_CART,
            payload: {response: null, error: e.response},
        })
    }
}


//update cart Item
export const applyCartCoupon = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/cart/coupon`, body);
        dispatch({
            type: APPLY_CART_COUPON,
            payload: {response, error: null},
        })

    } catch (e) {
        dispatch({
            type: APPLY_CART_COUPON,
            payload: {response: null, error: e.response},
        })
    }
}