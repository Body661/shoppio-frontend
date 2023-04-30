import {
    UPDATE_SEARCH_PARAMS,
} from "../types";

export const updateSearchParams = (params) => ({
    type: UPDATE_SEARCH_PARAMS,
    payload: params,
});