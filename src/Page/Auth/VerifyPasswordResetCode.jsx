import {Button, Container, Form, FormControl, Spinner} from 'react-bootstrap';
import useVerifyPassword from '../../hook/auth/useVerifyPassword';
import logo from "../../images/logo.png";

const VerifyPasswordPage = () => {
    const {code, handleChangeCode, handleSubmit, validated, loading, isSubmitted} = useVerifyPassword();

    return (
        <Container style={{minHeight: "80vh"}} className="d-flex align-items-center justify-content-center">
            <Form noValidate validated={validated}
                  className="d-flex flex-column align-items-center justify-content-center b-radius-10 login-form p-3">
                <img src={logo} alt="logo"/>
                <h3 className="title-login">Enter reset code</h3>

                <FormControl
                    required
                    minLength={6}
                    value={code}
                    onChange={handleChangeCode}
                    placeholder="Enter code"
                    type="text"
                    className="my-3 mb-3 b-radius-10"
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
    )

};

export default VerifyPasswordPage;
