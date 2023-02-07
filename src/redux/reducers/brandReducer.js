import {GET_ALL_BRANDS, CREATE_BRAND, GET_ONE_BRAND} from '../types'

const initState = {
    brands: [],
    brand: [],
    loading: true,
    error: false,
}
const brandReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload.brands,
                loading: false,
                error: action.payload.error
            }
        case GET_ONE_BRAND:
            return {
                ...state,
                brand: action.payload.brand,
                loading: false,
                error: action.payload.error
            }
        case CREATE_BRAND:
            return {
                ...state,
                brands: action.payload.brand,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default brandReducer