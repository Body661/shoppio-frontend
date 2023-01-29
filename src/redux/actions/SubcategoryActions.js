import {useInsertData} from "../../customHooks/useInsertData";
import {CREATE_SUBCATEGORY} from "../types";

export const createSubcategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData('/api/categories', data)
        dispatch({
            type: CREATE_SUBCATEGORY,
            payload: {subcategory: response, error: null}
        })
    } catch (e) {
        dispatch({
            type: CREATE_SUBCATEGORY,
            payload: {subcategory: [], error: `ERROR: ${e}`},
        })
    }
}