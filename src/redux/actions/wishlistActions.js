import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, USER_WISHLIST} from '../types'
import {useGetDataToken} from '../../customHooks/useGetData';
import {useInsertData} from '../../customHooks/useInsertData';
import useDeleteData from './../../customHooks/useDeleteData';


//add product to wishlist
export const addProductToWishList = (body) => async (dispatch) => {
    try {
        const response = await useInsertData("/wishlist", body);

        dispatch({
            type: ADD_TO_WISHLIST,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: e.response,
        })
    }
}

//remove product to wishlist
export const removeProductFromWishList = (prodID) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/wishlist/${prodID}`);
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: e.response,
        })
    }
}

//get wishlist product
export const getWishlist = () => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/wishlist`);
        dispatch({
            type: USER_WISHLIST,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: USER_WISHLIST,
            payload: e.response,
        })
    }
}
