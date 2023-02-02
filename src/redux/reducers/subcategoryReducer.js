import {CREATE_SUBCATEGORY, GET_SUBCATEGORY, GET_ALL_SUBCATEGORIES} from '../types'

const initState = {
    subcategories: [],
    subcategory: [],
    loading: true,
    error: null
}
const subcategoryReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_SUBCATEGORY:
            return {
                ...state,
                subcategory: action.payload.subcategory,
                loading: false,
                error: action.payload.error
            }
        case GET_SUBCATEGORY:
            return {
                ...state,
                subcategory: action.payload.subcategory,
                loading: false,
                error: action.payload.error
            }
        case GET_ALL_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.payload.subcategories,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default subcategoryReducer