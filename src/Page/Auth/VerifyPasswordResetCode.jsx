import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify';
import VerifyPasswordHook from '../../hook/auth/verifyPasswordHook';

const VerifyPasswordPage = () => {

    const [code, OnChangeCode, onSubmit] = VerifyPasswordHook()

    return (
        <Container style={{minHeight: "690px"}}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">Enter reset code</label>
                    <input
                        value={code}
                        onChange={OnChangeCode}
                        placeholder="Enter code..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">Submit</button>

                </Col>

            </Row>
            <ToastContainer/>
        </Container>
    )
}
export default VerifyPasswordPage