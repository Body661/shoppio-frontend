import {Button, Container, Form, FormControl, Spinner} from 'react-bootstrap';
import useResetPassword from '../../hook/auth/useResetPassword';
import logo from "../../images/logo.png";

const ResetPasswordPage = () => {
    const {
        password,
        passwordConfirm,
        handleChangePassword,
        handleChangePasswordConfirm,
        handleSubmit,
        validated,
        isSubmitted,
        loading
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
                    value={passwordConfirm}
                    onChange={handleChangePasswordConfirm}
                    placeholder="Confirm password"
                    type="password"
                    className="mb-3 b-radius-10"
                />

                <Button type="submit" variant="dark" onClick={handleSubmit} className="mb-3 btn-login w-100 b-radius-10">
                    Submit
                </Button>

                {isSubmitted && (
                    <div className="d-flex justify-content-center">
                        {loading && <Spinner animation="border" role="primary"/>}
                    </div>
                )}
            </Form>
        </Container>
    );
};

export default ResetPasswordPage;
