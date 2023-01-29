import {CREATE_CATEGORY, GET_ALL_CATEGORIES} from "../types";

const initState = {
    categories: [],
    loading: true,
    error: null

}
const categoryReducer = (state = initState, action) => {

    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories,
                loading: false,
                error: action.payload.error
            }
        case CREATE_CATEGORY:
            return {
                categories: action.payload.categories,
                loading: false
            }
        default: {
            return state
        }
    }

}
export default categoryReducer