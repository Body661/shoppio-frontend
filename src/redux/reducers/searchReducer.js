import {
    UPDATE_SEARCH_PARAMS,
    UPDATE_SEARCH_RESULTS,
} from "../types";

const initialState = {
    searchParams: {
        searchWord: "",
        checkedCategory: [],
        checkedBrand: [],
        priceFrom: "",
        priceTo: "",
        sortType: "",
    }
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_PARAMS:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    ...action.payload,
                },
            };
        case UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: {
                    ...state.searchResults,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default searchReducer