import {CREATE_CATEGORY, GET_ALL_CATEGORIES, GET_ONE_CATEGORY} from "../types";

const initState = {
    categories: [],
    category: [],
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
        case GET_ONE_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
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