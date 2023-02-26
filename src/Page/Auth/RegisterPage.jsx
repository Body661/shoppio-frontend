import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import UseRegister from "../../hook/auth/useRegister";

const RegisterPage = () => {
    const {
        name,
        email,
        phone,
        password,
        confirmPassword,
        onChangeName,
        onChangeEmail,
        onChangePhone,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
    } = UseRegister();

    return (
        <Container style={{ minHeight: "680px" }}>
            <Row className="py-5 d-flex justify-content-center height-search">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">Register</label>
                    <input
                        value={name}
                        onChange={onChangeName}
                        placeholder="Name..."
                        type="text"
                        className="user-input mt-3 text-center mx-auto"
                    />
                    <input
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="Email..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={phone}
                        onChange={onChangePhone}
                        placeholder="Phone number..."
                        type="phone"
                        className="user-input  text-center mx-auto"
                    />
                    <input
                        value={password}
                        onChange={onChangePassword}
                        placeholder="Password..."
                        type="password"
                        className="user-input text-center mt-3 mx-auto"
                    />
                    <input
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                        placeholder="Confirm password..."
                        type="password"
                        className="user-input text-center mt-3 mx-auto"
                    />
                    <button onClick={onSubmit} className="btn-login mx-auto mt-4">Create account</button>
                    <label className="mx-auto my-4">
                        Already have an account?{" "}
                        <Link to="/login" style={{ textDecoration: "none", cursor: "pointer", color: "red" }}>
                            Login
                        </Link>
                    </label>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default RegisterPage
