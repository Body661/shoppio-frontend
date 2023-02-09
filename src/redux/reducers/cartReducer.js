import {
    ADD_TO_CART,
    GET_USER_CART,
    CLEAR_USER_CART,
    UPDATE_ITEM_IN_CART,
    DELETE_ITEM_FROM_CART,
    APPLY_CART_COUPON
} from '../types'

const initState = {
    addToCart: [],
    userCart: [],
    clearCart: [],
    deleteItem: [],
    updateItem: [],
    applyCoupon: [],
    error: null
}
const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                addToCart: action.payload.response,
                error: action.payload.error
            }
        case GET_USER_CART:
            return {
                ...state,
                userCart: action.payload.response,
                error: action.payload.error
            }
        case CLEAR_USER_CART:
            return {
                ...state,
                clearCart: action.payload.response,
                error: action.payload.error
            }
        case DELETE_ITEM_FROM_CART:
            return {
                ...state,
                deleteItem: action.payload.response,
                error: action.payload.error
            }
        case UPDATE_ITEM_IN_CART:
            return {
                ...state,
                updateItem: action.payload.response,
                error: action.payload.error
            }
        case APPLY_CART_COUPON:
            return {
                ...state,
                applyCoupon: action.payload.response,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default cartReducer