import {ADD_COUPON, EDIT_COUPON, GET_ALL_COUPONS, GET_ONE_COUPON, DELETE_COUPON} from '../types'

const initState = {
    addCoupon: [],
    allCoupons: [],
    deleteCoupon: [],
    oneCoupon: [],
    editCoupon: [],
    error: null
}
const couponReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_COUPON:
            return {
                ...state,
                addCoupon: action.payload.coupon,
                error: action.payload.error
            }
        case GET_ALL_COUPONS:
            return {
                ...state,
                allCoupons: action.payload.coupons,
                error: action.payload.error
            }
        case DELETE_COUPON:
            return {
                ...state,
                deleteCoupon: action.payload.coupon,
                error: action.payload.error
            }
        case GET_ONE_COUPON:
            return {
                ...state,
                oneCoupon: action.payload.coupon,
                error: action.payload.error
            }
        case EDIT_COUPON:
            return {
                ...state,
                editCoupon: action.payload.coupon,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default couponReducer