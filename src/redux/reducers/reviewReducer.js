import {CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, ALL_REVIEW_PRODUCT} from '../types'

const initState = {
    createReview: [],
    allReviewProduct: [],
    deleteReview: [],
    updateReview: [],
    loading: true,
    error: null
}
const reviewReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_REVIEW:
            return {
                ...state,
                createReview: action.payload.createReview,
                error: action.payload.error,
                loading: false,
            }
        case ALL_REVIEW_PRODUCT:
            return {
                ...state,
                allReviewProduct: action.payload.allReviewProduct,
                loading: false,
                error: action.payload.error,
            }
        case DELETE_REVIEW:
            return {
                ...state,
                deleteReview: action.payload.deleteReview,
                error: action.payload.error,
                loading: false,
            }
        case UPDATE_REVIEW:
            return {
                ...state,
                updateReview: action.payload.updateReview,
                error: action.payload.error,
                loading: false,
            }
        default:
            return state;
    }
}
export default reviewReducer