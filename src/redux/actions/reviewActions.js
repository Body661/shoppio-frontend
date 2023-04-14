import {CREATE_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, ALL_REVIEW_PRODUCT} from '../types'
import {useGetDataToken} from '../../customHooks/useGetData'
import {useInsertData} from '../../customHooks/useInsertData'
import useDeleteData from './../../customHooks/useDeleteData';
import {useUpdateData} from '../../customHooks/useUpdateData';

//create rate
export const createReview = (prodID, body) => async (dispatch) => {
    try {
        const response = await useInsertData(`/products/${prodID}/reviews`, body);

        dispatch({
            type: CREATE_REVIEW,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: CREATE_REVIEW,
            payload: e.response,
        })
    }
}


//get all review to one product
export const allReviewProduct = (prodID, page, limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/products/${prodID}/reviews?page=${page}&limit=${limit}`);

        dispatch({
            type: ALL_REVIEW_PRODUCT,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ALL_REVIEW_PRODUCT,
            payload: e.response,
        })
    }
}


//delete review to one product
export const deleteReviewOnProduct = (productId, id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/products/${productId}/reviews/${id}`);

        dispatch({
            type: DELETE_REVIEW,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: DELETE_REVIEW,
            payload: e.response,
        })
    }
}

//update review to one product
export const updateReviewOnProduct = (productId, id, body) => async (dispatch) => {
    try {
        const response = await useUpdateData(`/products/${productId}/reviews/${id}`, body);

        dispatch({
            type: UPDATE_REVIEW,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: UPDATE_REVIEW,
            payload: e.response,
        })
    }
}