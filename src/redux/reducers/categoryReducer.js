import {GET_ALL_CATEGORIES} from "../types";

const initState = {
    categories: [],
    loading: true,

}
const categoryReducer = (state = initState, action) => {

    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        default: {
            return state
        }
    }

}
export default categoryReducer