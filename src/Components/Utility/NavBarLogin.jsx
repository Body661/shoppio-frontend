import React, {useEffect, useState} from 'react';
import {Navbar, Container, FormControl, Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png';
import login from '../../images/login.png';
import cart from '../../images/cart.png';
import useNavbarSearch from '../../hook/products/search/useNavbarSearch';

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
        <Navbar className="sticky-top" bg="white" variant="light" expand="sm">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logo} className="logo" alt="logo"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
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
                            <NavDropdown title={user.name} id="basic-nav-dropdown"
                                         className="d-flex align-items-center">
                                {user.role === 'admin' ? (
                                    <NavDropdown.Item href="/admin/products">Dashboard</NavDropdown.Item>
                                ) : (
                                    <Link to="/user/profile">
                                        <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                                    </Link>
                                )}
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={logOut} href="/">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link>
                                <Link to="/login" className="nav-text d-flex mt-3 justify-content-center">
                                    <img src={login} className="login-img" alt="Login"/>
                                    <p style={{color: 'black'}}>Login</p>
                                </Link>
                            </Nav.Link>
                        )}

                        {isUser && (
                            <Nav.Link href="/cart" style={{color: 'white'}}>
                                <Link to="cart" className="nav-text d-flex mt-3 justify-content-center">
                                    <img src={cart} className="login-img" alt="Cart"/>
                                    <p style={{color: 'black'}}>Cart</p>
                                </Link>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarLogin;
