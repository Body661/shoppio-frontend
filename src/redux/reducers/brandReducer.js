import {GET_ALL_BRANDS, CREATE_BRAND, GET_ONE_BRAND} from '../types'

const initState = {
    brands: null,
    brand: null,
    loading: true,
}
const brandReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_BRANDS:
            return {
                ...state,
                brands: action.payload,
                loading: false
            }
        case GET_ONE_BRAND:
            return {
                ...state,
                brand: action.payload,
            }
        case CREATE_BRAND:
            return {
                ...state,
                brands: action.payload,
            }
        default:
            return state;
    }
}
export default brandReducer