import {Button, Col, Container, Row, Spinner, FormSelect, FormText, FormControl, Form} from "react-bootstrap";
import {useEditUser} from "../../../hook/admin/user/useEditUser";
import {useParams} from "react-router-dom";
import React from "react";

const AdminEditUser = () => {
    const {id} = useParams();
    const {
        name,
        email,
        phone,
        role,
        onChangeEmail,
        onChangeName,
        onChangePhone,
        onChangeRole,
        handleSubmit,
        loadingFetch,
        loadingUpdate,
        isPress,
        validated
    } = useEditUser(id)

    return (
        <Container>

            {loadingFetch && <Spinner animation="border" variant="primary"/>}

            {!loadingFetch &&
                <Form validated={validated}>
                    <Row className="justify-content-start">
                        <div className="admin-content-text pb-4">Editing user details: {id}</div>
                        <Col sm="8">

                            <Form.Group as={Col} controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="User name"
                                    value={name}
                                    onChange={onChangeName}
                                    className="mt-3"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    className="mt-3"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom02">
                                <Form.Control
                                    required
                                    type="tel"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={onChangePhone}
                                    className="mt-3"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <FormSelect placeholder="Role" onChange={onChangeRole} className="mt-3">
                                <option value="user" selected={role === "user"}>user</option>
                                <option value="admin" selected={role === "admin"}>admin</option>
                            </FormSelect>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8" className="d-flex justify-content-end ">
                            <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">Save changes</button>
                        </Col>

                        {isPress && <div>
                            {loadingUpdate && <Spinner animation="border" role="primary"/>}
                        </div>}
                    </Row>
                </Form>
            }
        </Container>
    )

};

export default AdminEditUser;
