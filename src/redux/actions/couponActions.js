import {ADD_COUPON, GET_ALL_COUPONS, EDIT_COUPON, GET_ONE_COUPON, DELETE_COUPON} from '../types'

import {useInsertData} from '../../customHooks/useInsertData'
import {useGetDataToken} from '../../customHooks/useGetData'
import useDeleteData from './../../customHooks/useDeleteData';
import {useInsUpdateData} from '../../customHooks/useUpdateData';
//add coupon
export const addCoupon = (body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/coupons`, body);
        console.log(response)
        dispatch({
            type: ADD_COUPON,
            payload: {coupon: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: ADD_COUPON,
            payload: {coupon: [], error: e.response},
        })
    }
}
//get all coupon
export const getAllCoupon = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/coupons`);
        dispatch({
            type: GET_ALL_COUPONS,
            payload: {coupons: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_COUPONS,
            payload: {coupons: [], error: e.response},
        })
    }
}

//get one coupon
export const getOneCoupon = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/coupons/${id}`);
        dispatch({
            type: GET_ONE_COUPON,
            payload: {coupon: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_COUPON,
            payload: {coupon: [], error: e.response},
        })
    }
}

//delete coupon
export const deleteCoupon = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/coupons/${id}`);
        dispatch({
            type: DELETE_COUPON,
            payload: {coupon: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: DELETE_COUPON,
            payload: {coupon: [], error: e.response},
        })
    }
}

//edit coupon
export const editCoupon = (id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/coupons/${id}`, body);

        dispatch({
            type: EDIT_COUPON,
            payload: {coupon: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: EDIT_COUPON,
            payload: {coupon: [], error: e.response},
        })
    }
}