import {GET_ALL_ORDERS, UPDATE_ORDER_DELIVER, UPDATE_ORDER_PAY, GET_ONE_ORDER} from '../types'

const init = {
    getAllOrders: null,
    getOneOrder: null,
    changePay: null,
    deliveryStatus: null,
}
const orderReducer = (state = init, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return {
                ...state,
                getAllOrders: action.payload,
            }
        case GET_ONE_ORDER:
            return {
                ...state,
                getOneOrder: action.payload,
            }
        case UPDATE_ORDER_PAY:
            return {
                ...state,
                changePay: action.payload,
            }
        case UPDATE_ORDER_DELIVER:
            return {
                ...state,
                deliveryStatus: action.payload,
            }
        default:
            return state;
    }
}
export default orderReducer