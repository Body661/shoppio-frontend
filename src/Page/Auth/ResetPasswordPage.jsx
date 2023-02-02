import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify';
import ResetPasswordHook from '../../hook/auth/resetPasswordHook';

const ResetPasswordPage = () => {

    const [password, confirmPassword, OnChangePassword, OnChangeConfirmPassword, onSubmit] = ResetPasswordHook()

    return (
        <Container style={{minHeight: "690px"}}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">Reset password</label>
                    <input
                        value={password}
                        onChange={OnChangePassword}
                        placeholder="Enter your new password"
                        type="password"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={confirmPassword}
                        onChange={OnChangeConfirmPassword}
                        placeholder="New password confirmation"
                        type="password"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">Submit</button>

                </Col>

            </Row>
            <ToastContainer/>
        </Container>
    )
}


export default ResetPasswordPage