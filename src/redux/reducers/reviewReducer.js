import * as types from '../types';
import {getProductReviews} from "../actions/reviewActions";

const initState = {
    createReview: null,
    productReviews: null,
    deleteReview: null,
    updateReview: null,
}
const reviewReducer = (state = initState, action) => {
    switch (action.type) {
        case types.CREATE_REVIEW:
            return {
                ...state,
                createReview: action.payload,
            }
        case types.ALL_REVIEW_PRODUCT:
            return {
                ...state,
                getProductReviews: action.payload,
            }
        case types.DELETE_REVIEW:
            return {
                ...state,
                deleteReview: action.payload,
            }
        case types.UPDATE_REVIEW:
            return {
                ...state,
                updateReview: action.payload,
            }
        default:
            return state;
    }
}
export default reviewReducer