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

export default combineReducers({
    allCategories: categoryReducer,
    allBrands: brandReducer,
    subcategory: subcategoryReducer,
    productReducer,
    authReducer: authReducer,
    reviewReducer: reviewReducer,
    wishlistReducer: wishlistReducer,
    userAddressesReducer: userAddressesReducer,
    couponReducer: couponReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
    checkoutReducer: checkoutReducer
})