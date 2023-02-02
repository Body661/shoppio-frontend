import React from 'react'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import LoginHook from "../../hook/auth/loginHook";

const LoginPage = () => {
    const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress] = LoginHook();
    return (
        <Container style={{minHeight: "690px"}}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">Login</label>
                    <input
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="Email..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={password}
                        onChange={onChangePassword}
                        placeholder="Password..."
                        type="password"
                        className="user-input text-center mx-auto"
                    />
                    <button onClick={onSubmit} className="btn-login mx-auto mt-4">Login</button>
                    <label className="mx-auto my-4">
                        Dont have an account?{" "}
                        <Link to="/register" style={{textDecoration: 'none'}}>
                            <span style={{cursor: "pointer"}} className="text-danger">
                                Register now
                            </span>
                        </Link>
                    </label>


                    <label className="mx-auto my-4">

                        <Link to="/user/forget-password" style={{textDecoration: 'none', color: 'red'}}>
                            Password forget
                        </Link>
                    </label>

                    {isPress === true ? (loading === true ? (<Spinner animation="border" role="status">

                    </Spinner>) : null) : null}
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    )
}

export default LoginPage
