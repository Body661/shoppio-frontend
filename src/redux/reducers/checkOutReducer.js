import {CREATE_CASH_ORDER} from '../types'

const init = {
    createOrderCash: [],
    error: null,
    loading: true
}
const checkoutReducer = (state = init, action) => {
    switch (action.type) {
        case CREATE_CASH_ORDER:
            return {
                ...state,
                createOrderCash: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
export default checkoutReducer