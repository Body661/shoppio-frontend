import {Button, Col, Container, Row, FormSelect, Form, FormControl, Modal} from "react-bootstrap";
import {useEditUser} from "../../../hook/admin/user/useEditUser";
import {useParams} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {DeleteOutline, Person} from "@mui/icons-material";
import AddressCard from "../../User/Address/AddressCard";
import OrderCard from "../../Order/OrderCard";
import {useDeleteUser} from "../../../hook/admin/user/useDeleteUser";

const AdminEditUser = () => {
    const {id} = useParams();
    const {
        user,
        name,
        email,
        phone,
        role,
        handleChangeEmail,
        handleChangeName,
        handleChangePhone,
        handleChangeRole,
        handleSubmit,
        loadingFetch,
        loadingUpdate,
        isSubmitted,
        validated
    } = useEditUser(id)

    const {showDeleteModal, handleCloseDeleteModal, handleShowDeleteModal, handleDelete} = useDeleteUser(id)

    return (
        <Container>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={(loadingUpdate && isSubmitted) || loadingFetch}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header>
                    <Modal.Title>
                        <div>Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Are you sure you want to delete this user?</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" className="b-radius-10" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="b-radius-10" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="mt-4 d-flex align-items-center justify-content-between">
                <Col className="page-header">
                    <Person style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> {user?.data?.data?.name} </span>
                </Col>

                <Col className="d-flex justify-content-end">
                    <DeleteOutline className="fs-2" onClick={handleShowDeleteModal}/>
                </Col>
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
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={handleChangePhone}
                            className="mt-3 b-radius-10"
                        />

                        <FormSelect placeholder="Role" onChange={handleChangeRole} className="mt-3 b-radius-10">
                            <option value="user" selected={role === "user"}>User</option>
                            <option value="admin" selected={role === "admin"}>Admin</option>
                        </FormSelect>
                    </Col>

                    <Col sm="12" className="d-flex">
                        <Button onClick={handleSubmit} className="btn-dark mt-2 w-100 b-radius-10">Save changes</Button>
                    </Col>
                </Row>
            </Form>

            {user?.data?.data?.role === "user" && <>
                <Row className="mt-4">
                    <Col className="page-header">
                        <span className="page-header-text"> Addresses </span>
                    </Col>

                    <Col xs="12">
                        <Row className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                             style={{backgroundColor: "var(--main-gray)"}}>
                            {user?.data?.data?.addresses?.length ? user?.data?.data?.addresses?.map((address) =>
                                <AddressCard key={address?._id} address={address}/>) : <span>No addresses found</span>}
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col className="page-header">
                        <span className="page-header-text"> Orders </span>
                    </Col>

                    <Col xs="12">
                        <Row>
                            {user?.data?.data?.orders?.length ? user?.data?.data?.orders?.map((order) =>
                                    <OrderCard key={order?._id} order={order}/>) :
                                <Col className="d-flex flex-column gap-2 p-2 b-radius-10 mt-2"
                                     style={{backgroundColor: "var(--main-gray)"}}>No orders found</Col>}
                        </Row>
                    </Col>
                </Row>
            </>}
        </Container>
    )

};

export default AdminEditUser;
