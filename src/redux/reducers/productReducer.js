import * as types from '../types';

const initState = {
    createdProduct: null,
    allProducts: null,
    product: null,
    productsByCategory: null,
    productsByCategoryHome: null,
    productsByBrand: null,
    deleteProduct: null,
    updateProduct: null,
}
const productReducer = (state = initState, action) => {
    switch (action.type) {
        case types.CREATE_PRODUCT:
            return {
                ...state,
                createdProduct: action.payload,
            }
        case types.GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            }
        case types.GET_PRODUCT_DETAILS:
            return {
                product: action.payload,
            }
        case types.GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                productsByCategory: action.payload,
            }
        case types.GET_PRODUCTS_BY_CATEGORY_HOME:
            return {
                ...state,
                productsByCategoryHome: action.payload,
            }
        case types.GET_PRODUCTS_BY_BRAND:
            return {
                ...state,
                productsByBrand: action.payload,
            }
        case types.DELETE_PRODUCT:
            return {
                ...state,
                deleteProduct: action.payload,
            }
        case types.UPDATE_PRODUCT:
            return {
                ...state,
                updateProduct: action.payload,
            }
        default:
            return state;
    }
}
export default productReducer