import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify';
import ForgetPasswordHook from '../../hook/auth/forgetPasswordHook';

const ForgetPasswordPage = () => {
    const [OnChangeEmail, email, onSubmit] = ForgetPasswordHook()
    
    return (
        <Container style={{minHeight: "690px"}}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">Forget password</label>
                    <input
                        value={email}
                        onChange={OnChangeEmail}
                        placeholder="Enter you email..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">Send code</button>

                </Col>

            </Row>
            <ToastContainer/>
        </Container>
    )
}

export default ForgetPasswordPage