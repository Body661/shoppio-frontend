import React, {useEffect, useState} from 'react';
import {Navbar, Container, FormControl, Nav, NavDropdown, NavLink, NavbarBrand} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png';
import login from '../../images/login.png';
import cart from '../../images/cart.png';
import useNavbarSearch from '../../hook/products/search/useNavbarSearch';
import NavbarToggle from "react-bootstrap/NavbarToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {Person, ShoppingCart} from "@mui/icons-material";

const NavBarLogin = ({isUser}) => {
    const {handleKeyPressSearch, handleChangeSearch, searchWord} = useNavbarSearch();
    const [user, setUser] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser('');
    };

    return (
        <Navbar className="sticky-top" bg="white" variant="light" expand="lg">
            <Container>
                <NavbarBrand>
                    <Link to="/">
                        <img src={logo} className="logo" alt="logo"/>
                    </Link>
                </NavbarBrand>

                <NavbarToggle/>

                <NavbarCollapse>
                    <Link to="/categories" className="navbar-text d-flex justify-content-center align-items-center p-2">
                        Categories
                    </Link>

                    <Link to="/brands" className="navbar-text d-flex justify-content-center align-items-center p-2">
                        Brands
                    </Link>

                    <Link to="/products"
                          className="navbar-text d-flex justify-content-center align-items-center p-2 me-2">
                        Products
                    </Link>

                    <FormControl
                        value={searchWord}
                        onChange={handleChangeSearch}
                        onKeyPress={handleKeyPressSearch}
                        type="search"
                        placeholder="Search..."
                        className="me-2 w-100 text-center"
                        aria-label="Search"
                    />

                    <Nav className="me-auto">
                        {user ? (
                            <NavDropdown title={user.name}
                                         className="navbar-text justify-content-center align-items-center p-2 flex-column">

                                {user.role === 'admin' ? (
                                    <DropdownItem href="/admin/products">Dashboard</DropdownItem>
                                ) : (
                                    <Link to="/user/profile">
                                        <DropdownItem href="/user/profile">Profile</DropdownItem>
                                    </Link>
                                )}

                                <NavDropdown.Divider/>

                                <DropdownItem onClick={logOut} href="/">
                                    Logout
                                </DropdownItem>
                            </NavDropdown>
                        ) : (
                            <Link to="/login"
                                  className="navbar-text d-flex justify-content-center align-items-center p-2">
                                <Person/> Login
                            </Link>
                        )}

                        {isUser && (
                            <Link to="/cart"
                                  className="navbar-text d-flex justify-content-center align-items-center p-2">
                                <ShoppingCart/> Cart
                            </Link>
                        )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )

};

export default NavBarLogin;
