import {useEffect, useState} from 'react';
import {Navbar, Container, FormControl, Nav, NavDropdown, NavbarBrand} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../images/logo.png';
import NavbarToggle from "react-bootstrap/NavbarToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {Favorite, Person, ShoppingCart} from "@mui/icons-material";
import useSearch from "../../hook/products/useSearch";

const NavBar = ({isUser}) => {
    const [user, setUser] = useState('');
    const {handleSearchWord, getSearchParams} = useSearch()
    const {searchWord} = getSearchParams()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser('');
    };

    const {getProducts} = useSearch();
    const navigate = useNavigate();

    const onClickSearch = async () => {
        const path = window.location.pathname;
        if (path !== '/products') {
            navigate('/products')
            await getProducts()
        }
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
                        onChange={handleSearchWord}
                        onClick={onClickSearch}
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
                            <>
                                <Link to="/cart"
                                      className="navbar-text d-flex justify-content-center align-items-center p-2">
                                    <ShoppingCart/>
                                </Link>

                                <Link to="/user/favorites"
                                      className="navbar-text d-flex justify-content-center align-items-center p-2">
                                    <Favorite/>
                                </Link>
                            </>
                        )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )

};

export default NavBar;
