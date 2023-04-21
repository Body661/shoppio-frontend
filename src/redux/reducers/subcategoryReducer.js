import * as types from '../types';

const initState = {
    createSubcategory: null,
    subcategories: null,
    subcategory: null,
    deleteSubcategory: null,
    updateSubcategory: null,
    subcategoriesOfCategory: null,
}
const subcategoryReducer = (state = initState, action) => {
    switch (action.type) {
        case types.CREATE_SUBCATEGORY:
            return {
                ...state,
                createSubcategory: action.payload,
            }
        case types.GET_SUBCATEGORIES_OF_CATEGORY:
            return {
                ...state,
                subcategoriesOfCategory: action.payload,
            }
        case types.GET_ALL_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.payload,
            }
        case types.GET_SUBCATEGORY:
            return {
                ...state,
                subcategory: action.payload,
            }
        case types.DELETE_SUBCATEGORY:
            return {
                ...state,
                deleteSubcategory: action.payload,
            }
        case types.UPDATE_SUBCATEGORY:
            return {
                ...state,
                updateSubcategory: action.payload,
            }
        default:
            return state;
    }
}
export default subcategoryReducer