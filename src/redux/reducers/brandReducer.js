import * as types from '../types';

const initialState = {
    brands: null,
    brand: null,
    createBrand: null
}

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload,
            }
        case types.CREATE_BRAND:
            return {
                ...state,
                createBrand: action.payload,
            }
        default:
            return state
    }
}

export default brandReducer
