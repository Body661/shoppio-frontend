import {Container, Spinner, Form, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UseRegister from "../../hook/auth/useRegister";
import logo from "../../images/logo.png";

const RegisterPage = () => {
    const {
        name,
        email,
        phone,
        password,
        passwordConfirm,
        loading,
        handleChangeName,
        handleChangeEmail,
        handleChangePhone,
        handleChangePassword,
        handleChangePasswordConfirm,
        handleRegister,
        isPress,
        validated
    } = UseRegister();

    return (
        <Container style={{minHeight: "80vh"}} className="d-flex align-items-center justify-content-center">
            <Form noValidate validated={validated}
                  className="d-flex flex-column align-items-center justify-content-center b-radius-10 login-form p-3">
                <img src={logo} alt="logo"/>
                <h3 className="title-login">Sign up</h3>

                <FormControl
                    required
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Name"
                    type="text"
                    className="my-3 mb-3 b-radius-10"
                />

                <FormControl
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email"
                    type="email"
                    className="mb-3 b-radius-10"
                />

                <FormControl
                    required
                    value={phone}
                    onChange={handleChangePhone}
                    placeholder="Phone number"
                    type="tel"
                    className="mb-3 b-radius-10"
                />
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

                <Button type="submit" variant="dark" onClick={handleRegister}
                        className="mb-3 btn-login w-100 b-radius-10">
                    Create account
                </Button>

                <span className="mb-3">
                    Already have an account? <Link to="/login" style={{fontWeight: "bold"}}>Login</Link>
                </span>

                {isPress && <div className="d-flex justify-content-center">
                    {loading && <Spinner animation="border" role="primary"/>}
                </div>}
            </Form>
        </Container>
    )
}

export default RegisterPage
