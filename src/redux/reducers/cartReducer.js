import {
    ADD_TO_CART,
    GET_USER_CART,
    CLEAR_USER_CART,
    UPDATE_ITEM_IN_CART,
    DELETE_ITEM_FROM_CART,
    APPLY_CART_COUPON
} from '../types'

const initState = {
    addToCart: null,
    userCart: null,
    clearCart: null,
    deleteItem: null,
    updateItem: null,
    applyCoupon: null,
}
const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                addToCart: action.payload,
            }
        case GET_USER_CART:
            return {
                ...state,
                userCart: action.payload,
            }
        case CLEAR_USER_CART:
            return {
                ...state,
                clearCart: action.payload,
            }
        case DELETE_ITEM_FROM_CART:
            return {
                ...state,
                deleteItem: action.payload,
            }
        case UPDATE_ITEM_IN_CART:
            return {
                ...state,
                updateItem: action.payload,
            }
        case APPLY_CART_COUPON:
            return {
                ...state,
                applyCoupon: action.payload,
            }
        default:
            return state;
    }
}
export default cartReducer