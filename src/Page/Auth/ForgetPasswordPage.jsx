import {Container, Spinner, Form, FormControl, Button} from 'react-bootstrap';
import useForgetPassword from "../../hook/auth/useForgetPassword";
import logo from "../../images/logo.png";

const ForgetPasswordPage = () => {
    const {email, handleChangeEmail, handleSubmit, loading, isPress, validated} = useForgetPassword();

    return (
        <Container style={{minHeight: "80vh"}} className="d-flex align-items-center justify-content-center">
            <Form noValidate validated={validated}
                  className="d-flex flex-column align-items-center justify-content-center b-radius-10 login-form p-3">
                <img src={logo} alt="logo"/>
                <h3 className="title-login">Forgot password</h3>

                <FormControl
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    type="email"
                    className="my-3 mb-3 b-radius-10"
                />

                <Button type="submit" variant="dark" onClick={handleSubmit} className="mb-3 btn-login w-100 b-radius-10">
                    Send code
                </Button>

            </Form>

            {isPress && (
                <div className="d-flex justify-content-center">
                    {loading && <Spinner animation="border" role="status"/>}
                </div>
            )}
        </Container>
    );
};

export default ForgetPasswordPage;
