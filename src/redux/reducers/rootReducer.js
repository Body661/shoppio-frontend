import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subcategoryReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";

export default combineReducers({
    allCategories: categoryReducer,
    allBrands: brandReducer,
    subcategory: subcategoryReducer,
    allProducts: productReducer,
    authReducer: authReducer
})