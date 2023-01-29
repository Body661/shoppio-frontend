import {GET_ALL_BRANDS, CREATE_BRAND} from '../types'

const initState = {
    brands: [],
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
        case CREATE_BRAND:
            return {
                brands: action.payload.brands,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default brandReducer