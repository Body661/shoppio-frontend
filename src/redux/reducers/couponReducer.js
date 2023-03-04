import {ADD_COUPON, EDIT_COUPON, GET_ALL_COUPONS, GET_ONE_COUPON, DELETE_COUPON} from '../types'

const initState = {
    addCoupon: null,
    allCoupons: null,
    deleteCoupon: null,
    oneCoupon: null,
    editCoupon: null,
}
const couponReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_COUPON:
            return {
                ...state,
                addCoupon: action.payload,
            }
        case GET_ALL_COUPONS:
            return {
                ...state,
                allCoupons: action.payload,
            }
        case DELETE_COUPON:
            return {
                ...state,
                deleteCoupon: action.payload,
            }
        case GET_ONE_COUPON:
            return {
                ...state,
                oneCoupon: action.payload,
            }
        case EDIT_COUPON:
            return {
                ...state,
                editCoupon: action.payload,
            }
        default:
            return state;
    }
}

export default couponReducer