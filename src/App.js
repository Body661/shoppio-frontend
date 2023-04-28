import {useEffect, useState} from "react";
import {useJwt} from "react-jwt";
import {ToastContainer} from "react-toastify";
import HomePage from "./Page/Home/HomePage";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NavBar from "./Components/Utility/NavBar";
import Footer from "./Components/Utility/Footer";
import LoginPage from './Page/Auth/LoginPage';
import RegisterPage from "./Page/Auth/RegisterPage";
import CategoriesPage from "./Page/Category/CategoriesPage";
import AllBrandPage from "./Page/Brand/BrandsPage";
import ProductsPage from "./Page/Products/ProductsPage";
import ProductDetailsPage from "./Page/Products/ProductDetailsPage";
import CartPage from "./Page/User/Cart/CartPage";
import ChoosePayMethodPage from "./Page/User/Cart/ChoosePayMethodPage";
import AdminProductsPage from "./Page/Admin/Product/AdminProductsPage";
import AdminOrdersPage from "./Page/Admin/Order/AdminOrdersPage";
import AdminOrderDetailsPage from "./Page/Admin/Order/AdminOrderDetailsPage";
import AdminBrandsPage from "./Page/Admin/Brand/AdminBrandsPage";
import AddCategoryPage from "./Page/Admin/Category/AddCategoryPage";
import AddProductPage from "./Page/Admin/Product/AddProductPage";
import UserOrdersPage from "./Page/User/Order/UserOrdersPage";
import UserFavoritesPage from "./Page/User/UserFavoritesPage";
import UserAddAddressPage from './Page/User/Address/UserAddAddressPage';
import UserProfilePage from "./Page/User/UserProfilePage";
import AdminEditProductsPage from "./Page/Admin/Product/EditProductPage";
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordResetCode";
import ResetPasswordPage from "./Page/Auth/ResetPasswordPage";
import AddCouponPage from "./Page/Admin/Coupon/AddCouponPage";
import UpdateCouponPage from "./Page/Admin/Coupon/UpdateCouponPage";
import NotFoundPage from "./Components/Utility/NotFoundPage";
import ProductsByCategoryPage from "./Page/Products/ProductsByCategoryPage";
import ProductsByBrandPage from "./Page/Products/ProductsByBrandPage";
import UpdateCategoryPage from "./Page/Admin/Category/UpdateCategoryPage";
import UpdateBrandPage from "./Page/Admin/Brand/UpdateBrandPage";
import UsersManagementPage from "./Page/Admin/User/UsersManagementPage";
import EditUserPage from "./Page/Admin/User/EditUserPage";
import UserOrderPage from "./Page/User/Order/UserOrderPage";
import AddUserPage from "./Page/Admin/User/AddUserPage";
import AddBrandPage from "./Page/Admin/Brand/AddBrandPage";
import AdminCategoriesPage from "./Page/Admin/Category/AdminCategoriesPage";
import AddSubcategoryPage from "./Page/Admin/Subcategory/AddSubcategoryPage";
import AdminSubcategoriesPage from "./Page/Admin/Subcategory/AdminSubcategoriesPage";
import UpdateSubcategoryPage from "./Page/Admin/Subcategory/UpdateSubcategoryPage";
import AdminCouponsPage from "./Page/Admin/Coupon/AdminCouponsPage";
import {Analytics} from '@vercel/analytics/react';

function App() {
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [decodingToken, setDecodingToken] = useState(true);
    const {decodedToken, isExpired} = useJwt(localStorage.getItem("token"));

    useEffect(() => {
        setDecodingToken(true);

        if (decodedToken && !isExpired && decodedToken?.role) {
            if (decodedToken?.role === "admin") {
                setIsAdmin(true)
                setIsUser(false)
            } else if (decodedToken?.role === "user") {
                setIsAdmin(false)
                setIsUser(true)
            } else {
                setIsAdmin(false)
                setIsUser(false)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }
        } else if (localStorage.getItem("token") && isExpired || decodedToken?.role) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }

        setDecodingToken(false);
    }, [decodedToken, isExpired])

    return (
        <>
            <Analytics/>

            <BrowserRouter>
                <NavBar isUser={isUser}/>

                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/products/:id" element={<ProductDetailsPage/>}/>

                    <Route path="/categories" element={<CategoriesPage/>}/>
                    <Route path="/categories/:id" element={<ProductsByCategoryPage/>}/>

                    <Route path="/brands" element={<AllBrandPage/>}/>
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
                            <Route path="/admin/products" element={<AdminProductsPage/>}/>
                            <Route path="/admin/products/add-product" element={<AddProductPage/>}/>
                            <Route path="/admin/products/:id" element={<AdminEditProductsPage/>}/>

                            <Route path="/admin/orders" element={<AdminOrdersPage/>}/>
                            <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage/>}/>

                            <Route path="/admin/brands" element={<AdminBrandsPage/>}/>
                            <Route path="/admin/brands/add-brand" element={<AddBrandPage/>}/>
                            <Route path="/admin/brands/:id" element={<UpdateBrandPage/>}/>

                            <Route path="/admin/categories" element={<AdminCategoriesPage/>}/>
                            <Route path="/admin/categories/add-category" element={<AddCategoryPage/>}/>
                            <Route path="/admin/categories/:id" element={<UpdateCategoryPage/>}/>

                            <Route path="/admin/subcategories" element={<AdminSubcategoriesPage/>}/>
                            <Route path="/admin/subcategories/add-subcategory" element={<AddSubcategoryPage/>}/>
                            <Route path="/admin/subcategories/:id" element={<UpdateSubcategoryPage/>}/>

                            <Route path="/admin/coupons" element={<AdminCouponsPage/>}/>
                            <Route path="/admin/coupons/add-coupon" element={<AddCouponPage/>}/>
                            <Route path="/admin/coupons/:id" element={<UpdateCouponPage/>}/>

                            <Route path="/admin/user-management" element={<UsersManagementPage/>}/>
                            <Route path="/admin/user-management/add-user" element={<AddUserPage/>}/>
                            <Route path="/admin/user-management/:id" element={<EditUserPage/>}/>
                        </Route>
                    )}

                    {isUser && (
                        <Route>
                            <Route path="/user/orders" element={<UserOrdersPage/>}/>
                            <Route path="/user/orders/:id" element={<UserOrderPage/>}/>

                            <Route path="/user/favorites" element={<UserFavoritesPage/>}/>
                            <Route path="/user/add-address" element={<UserAddAddressPage/>}/>
                            <Route path="/user/profile" element={<UserProfilePage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/cart/pay-method" element={<ChoosePayMethodPage/>}/>
                        </Route>
                    )}

                    {!decodingToken && <Route path="*" element={<NotFoundPage/>}/>}

                </Routes>
            </BrowserRouter>
            <Footer/>
            <ToastContainer/>
        </>
    );
}

export default App;
