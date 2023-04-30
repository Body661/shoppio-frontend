import {combineReducers} from "redux";
import categoryReducer from './categoryReducer';
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subcategoryReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import wishlistReducer from "./wishlistReducer";
import userAddressesReducer from "./userAdressReducer";
import couponReducer from "./couponReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import checkoutReducer from "./checkOutReducer";
import userManagementReducer from "./userManagementReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    categoryReducer,
    brandReducer,
    subcategoryReducer,
    productReducer,
    authReducer,
    reviewReducer,
    wishlistReducer,
    userAddressesReducer,
    couponReducer,
    cartReducer,
    orderReducer,
    checkoutReducer,
    userManagementReducer,
    searchReducer
})