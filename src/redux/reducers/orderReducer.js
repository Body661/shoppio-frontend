import * as types from '../types';

const init = {
    getAllOrders: null,
    orderDetails: null,
    changePay: null,
    deliveryStatus: null,
}
const orderReducer = (state = init, action) => {
    switch (action.type) {
        case types.GET_ALL_ORDERS:
            return {
                ...state,
                getAllOrders: action.payload,
            }
        case types.GET_ONE_ORDER:
            return {
                ...state,
                orderDetails: action.payload,
            }
        case types.UPDATE_ORDER_PAY:
            return {
                ...state,
                changePay: action.payload,
            }
        case types.UPDATE_ORDER_DELIVER:
            return {
                ...state,
                deliveryStatus: action.payload,
            }
        default:
            return state;
    }
}
export default orderReducer