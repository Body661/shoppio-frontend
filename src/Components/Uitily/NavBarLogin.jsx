import React, {useEffect, useState} from 'react'
import {Navbar, Container, FormControl, Nav, NavDropdown} from 'react-bootstrap'
import logo from '../../images/logo.png'
import login from '../../images/login.png'
import cart from '../../images/cart.png'
import NavbarSearchHook from "../../hook/search/navbarSearchHook";
import {Link} from "react-router-dom";

const NavBarLogin = ({isUser}) => {
    const [OnKeyPressSearch, OnChangeSearch] = NavbarSearchHook()
    let word = "";
    if (sessionStorage.getItem("searchWord") !== null) word = sessionStorage.getItem("searchWord")

    const [user, setUser] = useState('');
    useEffect(() => {
        if (localStorage.getItem("user") !== null) setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser('')
    }

    return (
        <Navbar className="sticky-top" bg="white" variant="light" expand="sm">
            <Container>
                <Navbar.Brand>
                    <Link to='/'>
                        <img src={logo} className='logo' alt={logo}/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <FormControl
                        value={word}
                        onChange={OnChangeSearch}
                        onKeyPress={OnKeyPressSearch}
                        type="search"
                        placeholder="Search..."
                        className="me-2 w-100 text-center"
                        aria-label="Search"
                    />
                    <Nav className="me-auto">
                        {
                            user ? (
                                    <NavDropdown title={user.name} id="basic-nav-dropdown"
                                                 className="d-flex align-items-center">
                                        {
                                            user.role === "admin" ? (
                                                <NavDropdown.Item href="/admin/allProducts">
                                                    Dashboard
                                                </NavDropdown.Item>
                                            ) : (
                                                <Link to="/user/profile">
                                                    <NavDropdown.Item href="/user/profile">
                                                        Profile
                                                    </NavDropdown.Item>
                                                </Link>
                                            )
                                        }
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={logOut} href="/">Logout</NavDropdown.Item>

                                    </NavDropdown>
                                ) :
                                (<Nav.Link>
                                    <Link to='/login' className="nav-text d-flex mt-3 justify-content-center">
                                        <img src={login} className="login-img" alt="Login"/>
                                        <p style={{color: "black"}}>Login</p>
                                    </Link>
                                </Nav.Link>)
                        }

                        {isUser &&
                            <Nav.Link href='/cart' style={{color: "white"}}>
                                <Link to='cart' className="nav-text d-flex mt-3 justify-content-center">
                                    <img src={cart} className="login-img" alt="Cart"/>
                                    <p style={{color: "black"}}>Cart</p>
                                </Link>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse> </Container>
        </Navbar>
    )
}

export default NavBarLogin
