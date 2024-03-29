import {Button, Col, Container, Row, FormSelect, Form, FormControl} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useAddUser} from "../../../hook/admin/user/useAddUser";
import {Backdrop, CircularProgress} from "@mui/material";
import {Person} from "@mui/icons-material";

const AdminEditUser = () => {
    const {id} = useParams();
    const {
        name,
        email,
        phone,
        password,
        passwordConfirm,
        handleChangePassword,
        handleChangeEmail,
        handleChangeName,
        handleChangePhone,
        handleChangeRole,
        handleChangePasswordConfirm,
        handleSubmit,
        loading,
        isSubmitted,
        validated
    } = useAddUser(id)

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading && isSubmitted}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row>
                <div className="page-header mt-4">
                    <Person style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Add new user </span>
                </div>
            </Row>

            <Form validated={validated} style={{backgroundColor: "var(--main-gray)"}}
                  className="d-flex flex-column justify-content-center align-items-center p-4 mt-4 b-radius-20">
                <Row>
                    <Col sm="12">
                        <FormControl
                            required
                            type="text"
                            placeholder="User name"
                            value={name}
                            onChange={handleChangeName}
                            className="mt-3 b-radius-10"
                        />

                        <FormControl
                            required
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChangeEmail}
                            className="mt-3 b-radius-10"
                        />

                        <FormControl
                            required
                            minLength={8}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChangePassword}
                            className="mt-3 b-radius-10"
                        />

                        <FormControl
                            required
                            minLength={8}
                            type="password"
                            placeholder="Password confirm"
                            value={passwordConfirm}
                            onChange={handleChangePasswordConfirm}
                            className="mt-3 b-radius-10"
                        />

                        <FormControl
                            required
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={handleChangePhone}
                            className="mt-3 b-radius-10"
                        />

                        <FormSelect placeholder="Role" onChange={handleChangeRole} className="mt-3 b-radius-10">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </FormSelect>
                    </Col>

                    <Col sm="12" className="d-flex">
                        <Button onClick={handleSubmit} className="btn-dark mt-2 w-100 b-radius-10">Add user</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
};

export default AdminEditUser;
