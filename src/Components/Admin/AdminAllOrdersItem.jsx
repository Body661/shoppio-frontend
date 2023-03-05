import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminAllOrdersItem = ({ orderItem }) => {
    const {
        _id,
        user,
        isDelivered,
        isPaid,
        paymentMethodType,
        totalOrderPrice,
    } = orderItem;

    const deliveryStatus = isDelivered ? 'Delivered' : 'Not delivered';
    const paymentStatus = isPaid ? 'Paid' : 'Not paid';
    const paymentMethod = paymentMethodType === 'cash' ? 'cash' : 'online';

    return (
        <Col sm="12" style={{ borderBottom: '1px solid black' }}>
            <Link
                to={`/admin/orders/${_id}`}
                className="cart-item-body-admin my-2 px-1 d-flex px-2"
                style={{ textDecoration: 'none' }}
            >
                <div className="w-100">
                    <Row className="justify-content-between">
                        <Col sm="12" className=" d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 cat-text"> Order id: {_id}</div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className=" d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                                order from: {user?.name || ''}
                            </div>
                            <div
                                style={{ color: 'black' }}
                                className="d-inline pt-2 cat-rate me-2"
                            >
                                {user?.email || ''}
                            </div>
                        </Col>
                    </Row>

                    <Row className="d-flex justify-content-between">
                        <Col className="d-flex">
                            <div>
                                <div style={{ color: 'black' }} className="d-inline">
                                    Delivery status
                                </div>
                                <div className="d-inline mx-2 stat">{deliveryStatus}</div>
                            </div>
                            <div>
                                <div style={{ color: 'black' }} className="d-inline">
                                    Payment status
                                </div>
                                <div className="d-inline mx-2 stat">{paymentStatus}</div>
                            </div>

                            <div>
                                <div style={{ color: 'black' }} className="d-inline">
                                    Payment method
                                </div>
                                <div className="d-inline mx-2 stat">{paymentMethod}</div>
                            </div>
                        </Col>
                        <Col xs="6" className="d-flex justify-content-end">
                            <div>
                                <div className="brand-text">{totalOrderPrice || 0} euro</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    );
};

export default AdminAllOrdersItem;
