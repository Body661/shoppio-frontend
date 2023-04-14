import {useInsertData} from "../../customHooks/useInsertData";
import {CREATE_SUBCATEGORY, GET_SUBCATEGORY} from "../types";
import {useGetData} from "../../customHooks/useGetData";

export const createSubcategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/categories/${data.categoryId}/subcategories`, {name: data.name})
        dispatch({
            type: CREATE_SUBCATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: CREATE_SUBCATEGORY,
            payload: e.response,
        })
    }
}

export const getSubcategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/categories/${id}/subcategories`);

        dispatch({
            type: GET_SUBCATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_SUBCATEGORY,
            payload: e.response,
        })
    }
}