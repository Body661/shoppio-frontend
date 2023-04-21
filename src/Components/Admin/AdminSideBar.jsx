import {Link} from 'react-router-dom'
import {Menu, Sidebar, sidebarClasses, useProSidebar} from "react-pro-sidebar";
import {Button} from "react-bootstrap";
import {MenuOutlined} from "@mui/icons-material";

const AdminSideBar = () => {
    const {toggleSidebar, broken} = useProSidebar();

    return (
        <div style={{display: 'flex', zIndex: "100"}}>
            <Sidebar className="side-bar" customBreakPoint="768px" style={{overflow: "hidden"}}
                     rootStyles={{
                         [`.${sidebarClasses.container}`]: {
                             backgroundColor: 'white',
                             boxShadow: "none !important",
                         },
                         [`.${sidebarClasses.root}`]: {
                             boxShadow: "none !important",
                             border: "none"
                         }

                     }}>
                <Menu className="p-3 d-flex flex-column gap-2">
                    <div className="d-flex flex-column">
                        <Link to="/admin/orders">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage orders
                            </Button>
                        </Link>
                        <Link to="/admin/user-management">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage users
                            </Button>
                        </Link>
                        <Link to="/admin/products">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage products
                            </Button>
                        </Link>
                        <Link to="/admin/brands">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage brands
                            </Button>
                        </Link>

                        <Link to="/admin/categories">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage categories
                            </Button>
                        </Link>

                        <Link to="/admin/subcategories">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage subcategories
                            </Button>
                        </Link>
                        <Link to="/admin/coupons">
                            <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                                Manage coupons
                            </Button>
                        </Link>
                    </div>
                </Menu>
            </Sidebar>
            <main style={{padding: 10}}>
                {broken && (
                    <MenuOutlined onClick={() => toggleSidebar()}/>
                )}

            </main>
        </div>

    )
}

export default AdminSideBar
