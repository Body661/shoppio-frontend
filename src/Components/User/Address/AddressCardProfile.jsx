import {Row, Col, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import deleteIcon from '../../../images/delete.png';
import editIcon from '../../../images/edit.png';
import useDeleteAddress from "../../../hook/user/useDeleteAddress";


const AddressCard = ({item}) => {
    const {show, handleClose, handleShow, handleDelete} = useDeleteAddress(item?._id);

    return (
        <div className="user-address-card my-3 px-4 py-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div className="font">Confirm delete</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">Are you sure you want to delete this address?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="font" variant="success" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="font" variant="dark" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="d-flex justify-content-between">
                <Col xs="6">
                    <h4>{item?.alias}:</h4>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <Link to={`/user/addresses/${item?._id}`}>
                            <div className="d-flex mx-2">
                                <img alt="" className="ms-1 mt-2" src={editIcon} height="17px" width="15px"/>
                                <p className="item-delete-edit">Edit</p>
                            </div>
                        </Link>
                        <div onClick={handleShow} className="d-flex">
                            <img alt="" className="ms-1 mt-2" src={deleteIcon} height="17px" width="15px"/>
                            <p className="item-delete-edit">Delete</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: '#555550',
                            fontSize: '16px',
                        }}
                    >
                        Street:
                    </div>

                    <div
                        style={{
                            color: '#979797',
                            fontSize: '16px',
                        }}
                        className="mx-2"
                    >
                        {item?.street}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: '#555550',
                            fontSize: '16px',
                        }}
                    >
                        Postal code:
                    </div>

                    <div
                        style={{
                            color: '#979797',
                            fontSize: '16px',
                        }}
                        className="mx-2"
                    >
                        {item?.postalCode}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: '#555550',
                            fontSize: '16px',
                        }}
                    >
                        City:
                    </div>

                    <div
                        style={{
                            color: '#979797',
                            fontSize: '16px',
                        }}
                        className="mx-2"
                    >
                        {item?.city}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: '#555550',
                            fontSize: '16px',
                        }}
                    >
                        Country:
                    </div>

                    <div
                        style={{
                            color: '#979797',
                            fontSize: '16px',
                        }}
                        className="mx-2"
                    >
                        {item?.country}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: '#555550',
                            fontSize: '16px',
                        }}
                    >
                        Phone Number:
                    </div>

                    <div
                        style={{
                            color: '#979797',
                            fontSize: '16px',
                        }}
                        className="mx-2"
                    >
                        {item?.phone}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AddressCard;
