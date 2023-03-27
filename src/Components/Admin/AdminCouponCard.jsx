import {Button, Col, Modal, Row} from 'react-bootstrap'
import useCouponCard from '../../hook/admin/Coupon/useCouponCard'
import deleteIcon from '../../images/delete.png'
import editIcon from '../../images/edit.png'
import {Link} from 'react-router-dom';

const AdminCouponCard = ({coupon}) => {

    const {formatDate, isModalOpen, handleModalOpen, handleModalClose, handleDelete} = useCouponCard(coupon)

    return (
        <div className="user-address-card my-3 px-2">
            <Modal show={isModalOpen} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="font">Delete confirmation</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="font">Are you sure you want to delete this coupon?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" className="font" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" className="font" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="d-flex justify-content-between">
                <Col xs="6">
                    <div className="p-2">Coupon name: {coupon.name}</div>
                </Col>
                <Col xs="6" className="d-flex d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <Link to={`/admin/editCoupon/${coupon._id}`} style={{textDecoration: 'none'}}>
                            <div className="d-flex mx-2">
                                <img alt="" className="ms-1 mt-2" src={editIcon} height="17px" width="15px"/>
                                <p className="item-delete-edit"> Edit</p>
                            </div>
                        </Link>
                        <div onClick={handleModalOpen} className="d-flex ">
                            <img alt="" className="ms-1 mt-2" src={deleteIcon} height="17px" width="15px"/>
                            <p className="item-delete-edit"> Delete </p>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <div
                        style={{
                            color: '#555550',
                            fontFamily: 'Almarai',
                            fontSize: '16px',
                        }}
                    >
                        Expiration date: {formatDate(coupon.expire)}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: '#555550',
                            fontFamily: 'Almarai',
                            fontSize: '16px',
                        }}
                    >
                        Discount:
                    </div>

                    <div
                        style={{
                            color: '#979797',
                            fontFamily: 'Almarai',
                            fontSize: '16px',
                        }}
                        className="mx-2"
                    >
                        {coupon.discount}%
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AdminCouponCard