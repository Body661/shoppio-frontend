import React from 'react'
import {Link} from 'react-router-dom'

const AdminSideBar = () => {
    return (
        <div className="sidebar">
            <div className="d-flex flex-column">
                <Link to="/admin/allOrders" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
                        Manage orders
                    </div>
                </Link>
                <Link to="/admin/allProducts" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Manage products
                    </div>
                </Link>
                <Link to="/admin/addBrand" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Add brand
                    </div>
                </Link>

                <Link to="/admin/addCategory" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Add category
                    </div>
                </Link>

                <Link to="/admin/addSubcategory" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Add subcategory
                    </div>
                </Link>
                <Link to="/admin/addCoupon" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Add coupon
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default AdminSideBar
