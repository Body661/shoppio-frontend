import {Row, Col} from 'react-bootstrap'
import {Link} from "react-router-dom";

const OrderCard = ({order, isAdmin}) => {
    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "numeric", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (<Link to={order?._id} className="user-order mt-4">
        <Row>
            <div className="xs-black-text">
                <span>{formatDate(order?.createdAt)} | </span>
                <span>Order ID: {order?._id}</span>
                {isAdmin && <>
                    <span> | {order?.user?.name} | </span>
                    <span>{order?.user?.email}</span>
                </>}
            </div>
        </Row>


        <Row className="d-flex flex-column gap-2 p-2 b-radius-10" style={{backgroundColor: "var(--main-gray)"}}>
            {order?.cartItems && (order?.cartItems?.map((item, index) => {
                return (<Row className="d-flex align-items-center">
                    <Col xs="3" className="d-flex justify-content-start">
                        <img width="100%" src={item?.product?.cover} alt={item?.product?.title}
                             style={{objectFit: "contain"}}/>
                    </Col>
                    <Col xs="9" className="d-flex flex-column align-items-start" style={{
                        textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",
                    }}>
                            <span className="fw-bold">
                                {item?.product?.title || 'Product title not found'}
                            </span>
                        <span>
                                    {order?.isDelivered ? "Delivered" : "Not delivered"} | {order?.isPaid ? "Paid" : "Not paid"} | {order?.paymentMethodType === "card" ? "Online" : "Cash"}
                                </span>
                    </Col>
                </Row>)
            }))}
        </Row>
    </Link>)
}

export default OrderCard
