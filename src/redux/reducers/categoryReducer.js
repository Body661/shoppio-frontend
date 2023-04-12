import * as types from '../types';

const initState = {
    categories: null,
    createCategory: null,
    deleteCategory: null,
    updateCategory: null,
    category: null
}
const categoryReducer = (state = initState, action) => {

    switch (action.type) {
        case types.GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case types.CREATE_CATEGORY:
            return {
                ...state,
                createCategory: action.payload,
            }
        case types.GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case types.DELETE_CATEGORY:
            return {
                ...state,
                deleteCategory: action.payload
            }
        case types.UPDATE_CATEGORY:
            return {
                ...state,
                updateCategory: action.payload
            }
        default: {
            return state
        }
    }

}
export default categoryReducer