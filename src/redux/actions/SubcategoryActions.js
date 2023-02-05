import {useInsertData} from "../../customHooks/useInsertData";
import {CREATE_SUBCATEGORY, GET_SUBCATEGORY} from "../types";
import {useGetData} from "../../customHooks/useGetData";

export const createSubcategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData('/api/subcategories', data)
        dispatch({
            type: CREATE_SUBCATEGORY,
            payload: {subcategory: response, error: null}
        })
    } catch (e) {
        dispatch({
            type: CREATE_SUBCATEGORY,
            payload: {subcategory: [], error: e.response},
        })
    }
}

export const getSubcategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/categories/${id}/subcategories`);

        dispatch({
            type: GET_SUBCATEGORY,
            payload: {subcategory: response, error: null},
        })

    } catch (e) {
        dispatch({
            type: GET_SUBCATEGORY,
            payload: {subcategory: [], error: e.response},
        })
    }
}