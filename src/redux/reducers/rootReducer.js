import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subcategoryReducer";

export default combineReducers({
    allCategories: categoryReducer,
    allBrands: brandReducer,
    subcategory: subcategoryReducer
})