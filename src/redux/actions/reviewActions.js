import {CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, ALL_REVIEW_PRODUCT} from '../types'
import {useGetDataToken} from '../../customHooks/useGetData'
import {useInsertData} from '../../customHooks/useInsertData'
import useDeleteData from './../../customHooks/useDeleteData';
import {useInsUpdateData} from '../../customHooks/useUpdateData';

//create rate
export const createReview = (prodID, body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/products/${prodID}/reviews`, body);

        dispatch({
            type: CREATE_REVIEW,
            payload: {createReview: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: CREATE_REVIEW,
            payload: {createReview: [], error: e.response},
        })
    }
}


//get all review to one product
export const allReviewProduct = (prodID, page, limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/products/${prodID}/reviews?page=${page}&limit=${limit}`);

        dispatch({
            type: ALL_REVIEW_PRODUCT,
            payload: {allReviewProduct: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: ALL_REVIEW_PRODUCT,
            payload: {allReviewProduct: [], error: e.response},
        })
    }
}


//delete review to one product
export const deleteReviewOnProduct = (productId, id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/products/${productId}/reviews/${id}`);

        dispatch({
            type: DELETE_REVIEW,
            payload: {deleteReview: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: DELETE_REVIEW,
            payload: {deleteReview: [], error: e.response},
        })
    }
}

//update review to one product
export const updateReviewOnProduct = (productId, id, body) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/products/${productId}/reviews/${id}`, body);

        dispatch({
            type: UPDATE_REVIEW,
            payload: {updateReview: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: UPDATE_REVIEW,
            payload: {updateReview: [], error: e.response},
        })
    }
}