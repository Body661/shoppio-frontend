import React from 'react'
import {Link} from 'react-router-dom'

const UserSideBar = () => {
    return (
        <div className="sidebar">
            <div className="d-flex flex-column">
                <Link to="/user/allOrders" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text mt-3 border-bottom p-2 mx-auto text-center">
                        Manage your orders
                    </div>
                </Link>
                <Link to="/user/favoriteProducts" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Favorites
                    </div>
                </Link>
                <Link to="/user/addresses" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Addresses
                    </div>
                </Link>

                <Link to="/user/profile" style={{textDecoration: 'none'}}>
                    <div className="admin-side-text my-1 border-bottom p-2 mx-auto text-center">
                        Profile
                    </div>
                </Link>


            </div>
        </div>
    )
}
export default UserSideBar
