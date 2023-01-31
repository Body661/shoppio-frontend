import React from 'react'
import {Navbar, Container, FormControl, Nav} from 'react-bootstrap'
import logo from '../../images/logo.png'
import login from '../../images/login.png'
import cart from '../../images/cart.png'
import NavbarSearchHook from "../../hook/search/navbarSearchHook";
import {Link} from "react-router-dom";

const NavBarLogin = () => {

    const [OnKeyPressSearch, OnChangeSearch] = NavbarSearchHook()
    let word = "";
    if (sessionStorage.getItem("searchWord") !== null) word = sessionStorage.getItem("searchWord")

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
                        <Nav.Link>
                            <Link to='/login' className="nav-text d-flex mt-3 justify-content-center">
                                <img src={login} className="login-img" alt="login"/>
                                <p style={{color: "black"}}>Login</p>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='cart' className="nav-text d-flex mt-3 justify-content-center">
                                <img src={cart} className="login-img" alt="cart"/>
                                <p style={{color: "black"}}>Cart</p>
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarLogin
