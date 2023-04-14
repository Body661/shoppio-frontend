import React from 'react';
import {Container, Spinner, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import useLogin from '../../hook/auth/useLogin';
import logo from "../../images/logo.png"

const LoginPage = () => {
    const {
        email,
        password,
        loading,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        isPress,
        validated
    } = useLogin();

    return (
        <Container style={{minHeight: "80vh"}} className="d-flex align-items-center justify-content-center">
            <Form noValidate validated={validated}
                  className="d-flex flex-column align-items-center justify-content-center b-radius-10 login-form p-3">
                <img src={logo} alt="logo"/>
                <h3 className="title-login">Welcome Back!</h3>

                <FormControl
                    required
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    type="email"
                    className="my-3 mb-3 b-radius-10"
                />
                <FormControl
                    required
                    minLength={8}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    type="password"
                    className="mb-3 b-radius-10"
                />

                <Button type="submit" variant="dark" onClick={handleLogin} className="mb-3 btn-login w-100 b-radius-10">
                    Login
                </Button>

                <Link to="/user/forget-password" className="mb-3">
                    Forgot password?
                </Link>

                <span className="mb-3">
                    Don't have an account? <Link to="/register" style={{fontWeight: "bold"}}>Register now</Link>
                </span>


                {isPress && (
                    <div className="d-flex justify-content-center">
                        {loading && <Spinner animation="border" role="status"/>}
                    </div>
                )}
            </Form>
        </Container>
    )

};

export default LoginPage;
