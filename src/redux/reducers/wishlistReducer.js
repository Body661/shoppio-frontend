import {ADD_TO_WISHLIST, USER_WISHLIST, REMOVE_FROM_WISHLIST} from '../types'

const initState = {
    addToWishList: [],
    removeFromWishList: [],
    allWishList: [],
    error: null
}
const addToWishListReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return {
                ...state,
                addToWishList: action.payload.product,
                error: action.payload.error
            }
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                removeFromWishList: action.payload.product,
                error: action.payload.error
            }
        case USER_WISHLIST:
            return {
                ...state,
                allWishList: action.payload.products,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default addToWishListReducer