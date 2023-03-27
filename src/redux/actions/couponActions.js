import {ADD_COUPON, GET_ALL_COUPONS, EDIT_COUPON, GET_ONE_COUPON, DELETE_COUPON} from '../types'

import {useInsertData} from '../../customHooks/useInsertData'
import {useGetDataToken} from '../../customHooks/useGetData'
import useDeleteData from './../../customHooks/useDeleteData';
import {useInsUpdateData} from '../../customHooks/useUpdateData';
//add Coupon
export const addCoupon = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/coupons`, body);
        dispatch({
            type: ADD_COUPON,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ADD_COUPON,
            payload: e.response,
        })
    }
}
//get all Coupon
export const getAllCoupon = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/coupons`);
        dispatch({
            type: GET_ALL_COUPONS,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_COUPONS,
            payload: e.response,
        })
    }
}

//get one Coupon
export const getOneCoupon = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/coupons/${id}`);
        dispatch({
            type: GET_ONE_COUPON,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_COUPON,
            payload: e.response,
        })
    }
}

//delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/coupons/${id}`);
        dispatch({
            type: DELETE_COUPON,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: DELETE_COUPON,
            payload: e.response,
        })
    }
}

//edit Coupon
export const editCoupon = (id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/coupons/${id}`, body);

        dispatch({
            type: EDIT_COUPON,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: EDIT_COUPON,
            payload: e.response,
        })
    }
}