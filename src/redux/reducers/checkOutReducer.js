import * as types from '../types';

const initState = {
    createOrderCash: null,
    createOrderOnline: null,
}
const checkoutReducer = (state = initState, action) => {
    switch (action.type) {
        case types.CREATE_CASH_ORDER:
            return {
                ...state,
                createOrderCash: action.payload,
            }
        case types.CREATE_ORDER_ONLINE:
            return {
                ...state,
                createOrderOnline: action.payload,
            }
        default:
            return state;
    }
}
export default checkoutReducer