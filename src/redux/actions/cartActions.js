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
import {useUpdateData} from '../../customHooks/useUpdateData'
//add to Cart
export const addProductToCart = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/cart`, body);
        dispatch({
            type: ADD_TO_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ADD_TO_CART,
            payload: e.response,
        })
    }
}


//get all Cart items
export const getAllUserCartItems = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/cart`);
        dispatch({
            type: GET_USER_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_USER_CART,
            payload: e.response,
        })
    }
}

//clearAll Cart Item
export const clearAllCartItem = () => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/cart`);
        dispatch({
            type: CLEAR_USER_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CLEAR_USER_CART,
            payload: e.response,
        })
    }
}
//delete Cart Item
export const deleteCartItem = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/cart/${id}`);

        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: e.response,
        })
    }
}

//update Cart Item
export const updateCartItem = (id, body) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/api/cart/${id}`, body);
        dispatch({
            type: UPDATE_ITEM_IN_CART,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ITEM_IN_CART,
            payload: e.response,
        })
    }
}


//update Cart Item
export const applyCartCoupon = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/cart/coupon`, body);
        dispatch({
            type: APPLY_CART_COUPON,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: APPLY_CART_COUPON,
            payload: e.response,
        })
    }
}