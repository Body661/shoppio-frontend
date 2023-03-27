import React from 'react'
import { Row, Col } from 'react-bootstrap'
import UserOrdersCard from './UserOrdersCard'
const OrderItem = ({ orderItem }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    return (
        <div className="user-order mt-2">
            <Row>
                <div className="py-2 order-title"> Order id: {orderItem?._id || 0} | Date {formatDate(orderItem?.createdAt)}</div>
            </Row>
            {
                orderItem?.cartItems ? (orderItem?.cartItems?.map((item, index) => {
                    return <UserOrdersCard key={index} item={item} />
                })) : null
            }

            <Row className="d-flex justify-content-between">
                <Col xs="6" className="d-flex">
                    <div>
                        <div className="d-inline">Delivery status</div>
                        <div className="d-inline mx-2 stat">{orderItem?.isDelivered === true ? 'Delivered' : 'Not delivered'}</div>
                    </div>
                    <div>
                        <div className="d-inline">Payment status</div>
                        <div className="d-inline mx-2 stat">{orderItem?.isPaid === true ? 'Paid' : 'Not paid'}</div>
                    </div>

                    <div>
                        <div className="d-inline">Payment method</div>
                        <div className="d-inline mx-2 stat">{orderItem?.paymentMethodType === 'cash' ? 'cash' : 'Online'}</div>
                    </div>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div>
                        <div className="brand-text">{orderItem?.totalOrderPrice || 0} euro</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default OrderItem
