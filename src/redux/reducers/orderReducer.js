import {GET_ALL_ORDERS, UPDATE_ORDER_DELIVER, UPDATE_ORDER_PAY, GET_ONE_ORDER} from '../types'

const init = {
    getAllOrders: [],
    getOneOrder: [],
    changePay: [],
    deliveryStatus: [],
    error: null,
    loading: true
}
const orderReducer = (state = init, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return {
                ...state,
                getAllOrders: action.payload,
                loading: false
            }
        case GET_ONE_ORDER:
            return {
                ...state,
                getOneOrder: action.payload,
                loading: false
            }
        case UPDATE_ORDER_PAY:
            return {
                ...state,
                changePay: action.payload,
                loading: false
            }
        case UPDATE_ORDER_DELIVER:
            return {
                ...state,
                deliveryStatus: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
export default orderReducer