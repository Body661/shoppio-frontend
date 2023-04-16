import {Button, Col, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import editIcon from "../../../images/edit.png";
import deleteIcon from "../../../images/delete.png";
import {useDeleteUser} from "../../../hook/admin/user/useDeleteUser";

const AdminUserCard = ({user}) => {

    const {show, handleClose, handleShow, handelDelete} = useDeleteUser(user._id)

    return (
        <div className="admin-user-card my-3">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="font">Delete confirmation</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">Are you sure you want to delete this user?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" className="font" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="font" onClick={handelDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="d-flex justify-content-between">
                <Col xs="6">
                    <h5>User name: {user?.name}</h5>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <Link to={`/admin/user-management/${user?._id}`}>
                            <div className="d-flex mx-2">
                                <img alt="" className="ms-1 mt-2" src={editIcon} height="17px" width="15px"/>
                                <p className="item-delete-edit"> Edit</p>
                            </div>
                        </Link>

                        <div className="d-flex " onClick={handleShow}>
                            <img alt="" className="ms-1 mt-2" src={deleteIcon} height="17px" width="15px"/>
                            <p className="item-delete-edit"> Delete </p>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <div>
                        Email: {user?.email}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div>
                        Phone Number: {user?.phone}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div>
                        Role: {user?.role}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AdminUserCard;