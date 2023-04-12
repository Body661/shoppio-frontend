import * as types from '../types';

const initialState = {
    brands: null,
    brand: null,
    createBrand: null,
    deleteBrand: null,
    updateBrand: null,
}

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload,
            }
        case types.GET_BRAND:
            return {
                ...state,
                brand: action.payload,
            }
        case types.CREATE_BRAND:
            return {
                ...state,
                createBrand: action.payload,
            }
        case types.UPDATE_BRAND:
            return {
                ...state,
                updateBrand: action.payload,
            }
        case types.DELETE_BRAND:
            return {
                ...state,
                deleteBrand: action.payload,
            }
        default:
            return state
    }
}

export default brandReducer
