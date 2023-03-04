import * as types from '../types';

const initState = {
    categories: null,
    createCategory: null
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
        default: {
            return state
        }
    }

}
export default categoryReducer