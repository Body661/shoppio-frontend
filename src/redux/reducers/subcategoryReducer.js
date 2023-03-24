import * as types from '../types';

const initState = {
    subcategories: null,
    subcategory: null,
}
const subcategoryReducer = (state = initState, action) => {
    switch (action.type) {
        case types.CREATE_SUBCATEGORY:
            return {
                ...state,
                subcategory: action.payload,
            }
        case types.GET_SUBCATEGORY:
            return {
                ...state,
                subcategory: action.payload,
            }
        case types.GET_ALL_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.payload,
            }
        default:
            return state;
    }
}
export default subcategoryReducer