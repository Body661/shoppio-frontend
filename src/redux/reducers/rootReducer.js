import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import brandReducer from "./brandReducer";

export default combineReducers({
    allCategories: categoryReducer,
    allBrands: brandReducer
})