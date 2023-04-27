import {Row, Col, Container} from 'react-bootstrap'
import {Link, useParams} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";
import useGetOrderDetails from "../../hook/admin/useGetOrderDetails";
import ChangeOrderStatus from "../Admin/ChangeOrderStatus";

const OrderDetails = ({isAdmin}) => {
    const {id} = useParams();
    const {orderData, loading} = useGetOrderDetails(id);

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row>
                <div className="page-header mt-4">
                    <ShoppingCart style={{fontSize: "45px"}}/>
                    <span className="page-header-text fs-6"> Order: {orderData?._id} </span>
                </div>
            </Row>

            <Row className="d-flex flex-column gap-2 p-3 align-items-center justify-content-center b-radius-10 mt-4"
                 style={{backgroundColor: "var(--main-gray)"}}>
                {orderData?.cartItems && (orderData?.cartItems?.map((item) => {
                    return (<Row className="d-flex align-items-center b-radius-10"
                                 style={{backgroundColor: "var(--main-white)"}} key={item?._id}>
                        <Col xs="3" className="d-flex justify-content-start">
                            <Link to={`/products/${item?.product?._id}`}>
                                <img width="100%" src={item?.product?.cover} alt={item?.product?.title}
                                     style={{objectFit: "contain"}}/>
                            </Link>
                        </Col>
                        <Col xs="9" className="d-flex flex-column align-items-start" style={{
                            textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",
                        }}>
                        <span className="fw-bold d-flex gap-1">
                            {item?.product?.title || 'Product title not found'}
                        </span>

                            {item?.color && <span className="color border" style={{backgroundColor: item?.color}}/>}

                            <span>
                                €{item?.product?.priceAfterDiscount || item?.product?.price}
                        </span>
                            <span>
                                Quantity: {item?.quantity}
                        </span>
                        </Col>
                    </Row>)
                }))}
            </Row>

            <Row className="mt-4">
                <Row>
                    <Col sm={12} md={4}>
                        <div className="d-flex flex-column mt-4">
                            <span className="fw-bold">
                                Order number:
                            </span>
                            <span>
                                {orderData?._id}
                            </span>
                        </div>
                    </Col>

                    <Col sm={12} md={4}>
                        <div className="d-flex flex-column mt-4">
                            <span className="fw-bold">
                                Delivery address:
                            </span>

                            <span>
                                {orderData?.user?.name}
                            </span>

                            <span>
                                {orderData?.shippingAddress?.details}
                            </span>

                            <span>
                                {orderData?.shippingAddress?.postalCode} {orderData?.shippingAddress?.city}
                            </span>
                        </div>
                    </Col>

                    <Col sm={12} md={4}>
                        <div className="d-flex flex-column mt-4">
                            <span className="fw-bold">
                                Cost overview:
                            </span>

                            <div className="d-flex justify-content-between">
                                <span>
                                    Total items ({orderData?.cartItems?.length})
                                </span>

                                <span>
                                    €{orderData?.totalOrderPrice}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span>
                                    Shipment costs
                                </span>

                                <span>
                                    €{orderData?.shippingPrice}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span>
                                    Total
                                </span>

                                <span className="border-top border-dark">
                                    €{orderData?.totalOrderPrice}
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12} md={4} className="mt-4">
                        <div className="d-flex flex-column">
                        <span className="fw-bold">
                            Ordered on:
                        </span>
                            <span>
                            {new Date(orderData?.createdAt).toUTCString()}
                        </span>
                        </div>
                    </Col>

                    <Col sm={12} md={4}>
                        <div className="d-flex flex-column mt-4">
                        <span className="fw-bold">
                            Delivery status:
                        </span>
                            <span>
                            {orderData?.isDelivered ? "Delivered" : "Not delivered yet"}
                        </span>
                        </div>
                    </Col>

                    <Col sm={12} md={4}>
                        <div className="d-flex flex-column mt-4">
                        <span className="fw-bold">
                            Pay method:
                        </span>
                            <span>
                            {orderData?.paymentMethodType === "card" ? "Online" : "Cash"} ({orderData?.isPaid ? "Paid" : "Not paid yet"})
                        </span>
                        </div>
                    </Col>
                </Row>
            </Row>
            {
                isAdmin && <ChangeOrderStatus order={orderData}/>
            }
        </Container>
    )
}

export default OrderDetails
