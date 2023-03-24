import * as types from '../types';

const initState = {
    addCoupon: null,
    allCoupons: null,
    deleteCoupon: null,
    oneCoupon: null,
    editCoupon: null,
}
const couponReducer = (state = initState, action) => {
    switch (action.type) {
        case types.ADD_COUPON:
            return {
                ...state,
                addCoupon: action.payload,
            }
        case types.GET_ALL_COUPONS:
            return {
                ...state,
                allCoupons: action.payload,
            }
        case types.DELETE_COUPON:
            return {
                ...state,
                deleteCoupon: action.payload,
            }
        case types.GET_ONE_COUPON:
            return {
                ...state,
                oneCoupon: action.payload,
            }
        case types.EDIT_COUPON:
            return {
                ...state,
                editCoupon: action.payload,
            }
        default:
            return state;
    }
}

export default couponReducer