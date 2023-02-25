import {CREATE_CASH_ORDER} from '../types'
import {useInsertData} from '../../customHooks/useInsertData'

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