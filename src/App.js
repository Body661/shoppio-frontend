import {useEffect, useState} from "react";
import {useJwt} from "react-jwt";
import {ToastContainer} from "react-toastify";
import HomePage from "./Page/Home/HomePage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBarLogin from "./Components/Utility/NavBarLogin";
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
import AddBrandPage from "./Page/Admin/Brand/AddBrandPage";
import AddCategoryPage from "./Page/Admin/Category/AddCategoryPage";
import AddSubCategoryPage from "./Page/Admin/Subcategory/AddSubCategoryPage";
import AddProductPage from "./Page/Admin/Product/AddProductPage";
import UserOrdersPage from "./Page/User/Order/UserOrdersPage";
import UserWishListPage from "./Page/User/UserWishListPage";
import UserAddAddressPage from './Page/User/Address/UserAddAddressPage';
import UserProfilePage from "./Page/User/UserProfilePage";
import AdminEditProductsPage from "./Page/Admin/Product/EditProductPage";
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordResetCode";
import ResetPasswordPage from "./Page/Auth/ResetPasswordPage";
import AddCouponPage from "./Page/Admin/Coupon/AddCouponPage";
import EditCouponPage from "./Page/Admin/Coupon/EditCouponPage";
import NotFoundPage from "./Components/Utility/NotFoundPage";
import ProductsByCategoryPage from "./Page/Products/ProductsByCategoryPage";
import ProductsByBrandPage from "./Page/Products/ProductsByBrandPage";
import UpdateCategoryPage from "./Page/Admin/Category/UpdateCategoryPage";
import UpdateBrandPage from "./Page/Admin/Brand/UpdateBrandPage";
import UsersManagementPage from "./Page/Admin/User/UsersManagementPage";
import EditUserPage from "./Page/Admin/User/EditUserPage";

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
        <>
            <BrowserRouter>
                <NavBarLogin isUser={isUser}/>

                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="/categories" element={<CategoriesPage/>}/>
                    <Route path="/brands" element={<AllBrandPage/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/products/:id" element={<ProductDetailsPage/>}/>
                    <Route path="/categories/:id" element={<ProductsByCategoryPage/>}/>
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
                            <Route path="/admin/orders" element={<AdminOrdersPage/>}/>
                            <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage/>}/>
                            <Route path="/admin/brands" element={<AddBrandPage/>}/>
                            <Route path="/admin/categories" element={<AddCategoryPage/>}/>
                            <Route path="/admin/subcategories" element={<AddSubCategoryPage/>}/>
                            <Route path="/admin/add-product" element={<AddProductPage/>}/>
                            <Route path="/admin/updated-product/:id" element={<AdminEditProductsPage/>}/>
                            <Route path="/admin/coupons" element={<AddCouponPage/>}/>
                            <Route path="/admin/coupons/:id" element={<EditCouponPage/>}/>
                            <Route path="/admin/update-category/:id" element={<UpdateCategoryPage/>}/>
                            <Route path="/admin/update-brand/:id" element={<UpdateBrandPage/>}/>
                            <Route path="/admin/user-management" element={<UsersManagementPage/>}/>
                            <Route path="/admin/user-management/:id" element={<EditUserPage/>}/>
                        </Route>
                    )}

                    {isUser && (
                        <Route>
                            <Route path="/user/orders" element={<UserOrdersPage/>}/>
                            <Route path="/user/wishlist" element={<UserWishListPage/>}/>
                            <Route path="/user/add-address" element={<UserAddAddressPage/>}/>
                            <Route path="/user/profile" element={<UserProfilePage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/order/pay-method" element={<ChoosePayMethodPage/>}/>
                        </Route>
                    )}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
            <ToastContainer/>
        </>
    );
}

export default App;
