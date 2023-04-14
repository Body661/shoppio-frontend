import {GET_ALL_ORDERS, UPDATE_ORDER_DELIVER, GET_ONE_ORDER, UPDATE_ORDER_PAY} from '../types'

import {useGetDataToken} from '../../customHooks/useGetData'
import {useUpdateData} from '../../customHooks/useUpdateData';

export const getAllOrders = (page, limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/order?limit=${limit}&page=${page}`);
        dispatch({
            type: GET_ALL_ORDERS,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: GET_ALL_ORDERS,
            payload: e.response
        })
    }
}

export const getOneOrder = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/order/${id}`);

        dispatch({
            type: GET_ONE_ORDER,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: GET_ONE_ORDER,
            payload: e.response
        })
    }
}

export const changeOrderPay = (id) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/order/${id}/pay`);

        dispatch({
            type: UPDATE_ORDER_PAY,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ORDER_PAY,
            payload: e.response
        })
    }
}

export const changeOrderDelivery = (id) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/order/${id}/delivered`);

        dispatch({
            type: UPDATE_ORDER_DELIVER,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ORDER_DELIVER,
            payload: e.response
        })
    }
}