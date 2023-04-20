import {Link} from 'react-router-dom'
import {Menu, Sidebar, sidebarClasses, useProSidebar} from "react-pro-sidebar";
import {MenuOutlined} from "@mui/icons-material";
import {Button} from "react-bootstrap";

const UserSideBar = () => {
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
                    <Link to="/user/profile">
                        <Button className="btn-dark my-1 border-bottom p-2 mx-auto text-center w-100">
                            Profile
                        </Button>
                    </Link>

                    <Link to="/user/orders">
                        <Button className="btn-dark mt-3 border-bottom p-2 mx-auto text-center w-100">
                            Manage your orders
                        </Button>
                    </Link>
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
export default UserSideBar
