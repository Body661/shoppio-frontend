import React from 'react';
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import useLogin from '../../hook/auth/useLogin';

const LoginPage = () => {
    const {email, password, loading, handleEmailChange, handlePasswordChange, handleSubmit, isPress} = useLogin();

    return (
        <Container style={{minHeight: '690px'}}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">Login</label>
                    <input
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password..."
                        type="password"
                        className="user-input text-center mx-auto"
                    />
                    <button onClick={handleSubmit} className="btn-login mx-auto mt-4">
                        Login
                    </button>
                    <label className="mx-auto my-4">
                        Don't have an account?{' '}
                        <Link to="/register" style={{textDecoration: 'none'}}>
              <span style={{cursor: 'pointer'}} className="text-danger">
                Register now
              </span>
                        </Link>
                    </label>

                    <label className="mx-auto my-4">
                        <Link to="/user/forget-password" style={{textDecoration: 'none', color: 'red'}}>
                            Forget password?
                        </Link>
                    </label>

                    {isPress && (
                        <div className="d-flex justify-content-center">
                            {loading && <Spinner animation="border" role="status"/>}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;