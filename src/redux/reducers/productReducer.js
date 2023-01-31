import {
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCT_DETAILS,
    GET_ALL_PRODUCTS,

} from '../types'

const initState = {
    createdProduct: [],
    allProducts: [],
    product: [],
    productsByCategory: [],
    deleteProduct: [],
    updateProduct: [],
    loading: true,
    error: null,
}
const productReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                createdProduct: action.payload.createdProduct,
                loading: false,
                error: action.payload.error
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload.allProducts,
                loading: false,
                error: action.payload.error
            }
        case GET_PRODUCT_DETAILS:
            return {
                product: action.payload.product,
                loading: false,
                error: action.payload.error
            }
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                productsByCategory: action.payload.productsByCategory,
                loading: false,
                error: action.payload.error
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                deleteProduct: action.payload.deleteProduct,
                loading: false,
                error: action.payload.error
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                updateProduct: action.payload.updateProduct,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default productReducer