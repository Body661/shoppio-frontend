import React from 'react';
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import useForgetPassword from "../../hook/auth/useForgetPassword";

const ForgetPasswordPage = () => {
    const {email, onChangeEmail, onSubmit, loading, isPress} = useForgetPassword();

    return (
        <Container style={{ minHeight: '690px' }}>
            <Row className="py-5 d-flex justify-content-center">
                <Col sm="12" className="d-flex flex-column">
                    <label className="mx-auto title-login">Forget password</label>
                    <input
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="Enter your email..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">
                        Send code
                    </button>
                </Col>
            </Row>
            {isPress && (
                <div className="d-flex justify-content-center">
                    {loading && <Spinner animation="border" role="status"/>}
                </div>
            )}
        </Container>
    );
};

export default ForgetPasswordPage;
