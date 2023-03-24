import HomePage from "./Page/Home/HomePage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBarLogin from "./Components/Utility/NavBarLogin";
import Footer from "./Components/Utility/Footer";
import LoginPage from './Page/Auth/LoginPage';
import RegisterPage from "./Page/Auth/RegisterPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import AllBrandPage from "./Page/Brand/AllBrandPage";
import ShopProductsPage from "./Page/Products/ShopProductsPage";
import ProductDetailsPage from "./Page/Products/ProductDetailsPage";
import CartPage from "./Page/Cart/CartPage";
import ChoosePayMethodPage from "./Page/Checkout/ChoosePayMethodPage";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage";
import AdminOrderDetailsPage from "./Page/Admin/AdminOrderDetailsPage";
import AdminAddBrandPage from "./Page/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Page/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./Page/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "./Page/User/UserAllOrdersPage";
import UserFavoriteProductsPage from "./Page/User/UserFavoriteProductsPage";
import UserAllAddressPage from './Page/User/UserAllAddressPage';
import UserAddAddressPage from './Page/User/UserAddAddressPage';
import UserEditAddressPage from './Page/User/UserEditAddressPage';
import UserProfilePage from "./Page/User/UserProfilePage";
import AdminEditProductsPage from "./Page/Admin/AdminEditProductPage";
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordResetCode";
import ResetPasswordPage from "./Page/Auth/ResetPasswordPage";
import AdminAddCouponPage from "./Page/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "./Page/Admin/AdminEditCouponPage";
import React, {useEffect, useState} from "react";
import {useJwt} from "react-jwt";
import NotFoundPage from "./Components/Utility/NotFoundPage";
import ProductsByCategoryPage from "./Page/Products/ProductsByCategoryPage";
import ProductsByBrandPage from "./Page/Products/ProductsByBrandPage";
import {ToastContainer} from "react-toastify";

function App() {
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const {decodedToken, isExpired} = useJwt(localStorage.getItem("token"));

    useEffect(() => {
        if (decodedToken && !isExpired) {
            if (decodedToken?.role === "admin") {
                setIsAdmin(true)
                setIsUser(false)
            } else if (decodedToken?.role === "user") {
                setIsAdmin(false)
                setIsUser(true)
            } else {
                setIsAdmin(false)
                setIsUser(false)
            }
        } else if (localStorage.getItem("token") && isExpired) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.reload();
        }
    }, [decodedToken, isExpired])

    return (
        <div className="font">
            <BrowserRouter>
                <NavBarLogin isUser={isUser}/>

                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="/allCategory" element={<AllCategoryPage/>}/>
                    <Route path="/allBrands" element={<AllBrandPage/>}/>
                    <Route path="/products" element={<ShopProductsPage/>}/>
                    <Route path="/products/:id" element={<ProductDetailsPage/>}/>
                    <Route path="/category/:id" element={<ProductsByCategoryPage/>}/>
                    <Route path="/brands/:id" element={<ProductsByBrandPage/>}/>

                    {!isUser && !isAdmin && (
                        <Route>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/user/forget-password" element={<ForgetPasswordPage/>}/>
                            <Route path="/user/verify-code" element={<VerifyPasswordPage/>}/>
                            <Route path="/user/reset-password" element={<ResetPasswordPage/>}/>
                        </Route>
                    )}

                    {isAdmin && (
                        <Route>
                            <Route path="/admin/allProducts" element={<AdminAllProductsPage/>}/>
                            <Route path="/admin/allOrders" element={<AdminAllOrdersPage/>}/>
                            <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage/>}/>
                            <Route path="/admin/addBrand" element={<AdminAddBrandPage/>}/>
                            <Route path="/admin/addCategory" element={<AdminAddCategoryPage/>}/>
                            <Route path="/admin/addSubcategory" element={<AdminAddSubCategoryPage/>}/>
                            <Route path="/admin/addProduct" element={<AdminAddProductsPage/>}/>
                            <Route path="/admin/editProduct/:id" element={<AdminEditProductsPage/>}/>
                            <Route path="/admin/addCoupon" element={<AdminAddCouponPage/>}/>
                            <Route path="/admin/editCoupon/:id" element={<AdminEditCouponPage/>}/>
                        </Route>
                    )}

                    {isUser && (
                        <Route>
                            <Route path="/user/allOrders" element={<UserAllOrdersPage/>}/>
                            <Route path="/user/favoriteProducts" element={<UserFavoriteProductsPage/>}/>
                            <Route path="/user/addresses" element={<UserAllAddressPage/>}/>
                            <Route path="/user/add-address" element={<UserAddAddressPage/>}/>
                            <Route path="/user/edit-address/:id" element={<UserEditAddressPage/>}/>
                            <Route path="/user/profile" element={<UserProfilePage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/order/payMethod" element={<ChoosePayMethodPage/>}/>
                        </Route>
                    )}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
            <ToastContainer/>
        </div>
    );
}

export default App;
