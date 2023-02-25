import {CREATE_CASH_ORDER, CREATE_ORDER_ONLINE} from '../types'
import {useInsertData} from '../../customHooks/useInsertData'
import {useGetDataToken} from "../../customHooks/useGetData";

export const createOrderCash = (id, body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/order/${id}`, body);
        dispatch({
            type: CREATE_CASH_ORDER,
            payload: response
        })

    } catch (e) {
        dispatch({
            type: CREATE_CASH_ORDER,
            payload: e.response
        })
    }
}

//create order by card for user
export const createOrderOnline = (id, body) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/order/checkout/${id}`, body);
        dispatch({
            type: CREATE_ORDER_ONLINE,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_ONLINE,
            payload: e.response,
        })
    }
}