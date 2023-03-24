import * as types from '../types';

const initState = {
    allWishList: null,
    addToWishList: null,
    removeFromWishList: null,
}
const addToWishListReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ADD_TO_WISHLIST:
            return {
                ...state,
                addToWishList: action.payload,
            }
        case types.REMOVE_FROM_WISHLIST:
            return {
                ...state,
                removeFromWishList: action.payload,
            }
        case types.USER_WISHLIST:
            return {
                ...state,
                allWishList: action.payload,
            }
        default:
            return state;
    }
}
export default addToWishListReducer