import React from 'react';
import {Button, Container, Form, FormControl} from 'react-bootstrap';
import useResetPassword from '../../hook/auth/useResetPassword';
import logo from "../../images/logo.png";

const ResetPasswordPage = () => {
    const {
        password,
        confirmPassword,
        handleChangePassword,
        handleChangePasswordConfirm,
        handleSubmit,
        validated
    } = useResetPassword();

    return (
        <Container style={{minHeight: "80vh"}} className="d-flex align-items-center justify-content-center">
            <Form noValidate validated={validated}
                  className="d-flex flex-column align-items-center justify-content-center b-radius-10 login-form p-3">
                <img src={logo} alt="logo"/>
                <h3 className="title-login">Reset password</h3>

                <FormControl
                    required
                    minLength={8}
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Password"
                    type="password"
                    className="mb-3 b-radius-10"
                />

                <FormControl
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={handleChangePasswordConfirm}
                    placeholder="Confirm password"
                    type="password"
                    className="mb-3 b-radius-10"
                />

                <Button type="submit" variant="dark" onClick={handleSubmit} className="mb-3 btn-login w-100 b-radius-10">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default ResetPasswordPage;
