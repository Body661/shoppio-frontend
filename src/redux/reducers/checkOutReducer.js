import {CREATE_CASH_ORDER, CREATE_ORDER_ONLINE} from '../types'

const initState = {
    createOrderCash: [],
    createOrderOnline: [],
    error: null,
    loading: true
}
const checkoutReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_CASH_ORDER:
            return {
                ...state,
                createOrderCash: action.payload,
                loading: false
            }
        case CREATE_ORDER_ONLINE:
            return {
                ...state,
                createOrderOnline: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
export default checkoutReducer