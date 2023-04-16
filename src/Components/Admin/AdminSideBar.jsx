import React from 'react'
import {Link} from 'react-router-dom'

const AdminSideBar = () => {
    return (
        <div className="sidebar">
            <div className="d-flex flex-column">
                <Link to="/admin/orders">
                    <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
                        Manage orders
                    </div>
                </Link>
                <Link to="/admin/user-management">
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Manage users
                    </div>
                </Link>
                <Link to="/admin/products">
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Manage products
                    </div>
                </Link>
                <Link to="/admin/brands">
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Manage brands
                    </div>
                </Link>

                <Link to="/admin/categories">
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Manage categories
                    </div>
                </Link>

                <Link to="/admin/subcategories">
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Add subcategory
                    </div>
                </Link>
                <Link to="/admin/coupons">
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Add coupon
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default AdminSideBar
