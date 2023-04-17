import {Button, Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import useChangeOrderStatus from "../../hook/admin/useChangeOrderStatus";
import {Backdrop, CircularProgress} from "@mui/material";
import {toast} from "react-toastify";

const ChangeOrderStatus = ({order}) => {

    const [deliveryStatus, setDeliveryStatus] = useState(null);
    const [payStatus, setPayStatus] = useState(null);
    const {
        handleChangePayStatus,
        handleChangeDeliveryStatus,
        loadingPay,
        loadingDelivery
    } = useChangeOrderStatus(order?._id)

    useEffect(() => {
        setDeliveryStatus(order?.isDelivered)
        setPayStatus(order?.isPaid)
    }, [order])

    const changeDeliveryStatus = (status) => {
        setDeliveryStatus(status);
    };

    const changePayStatus = (status) => {
        if (order?.paymentMethodType === "cash") {
            setPayStatus(status);
        } else {
            toast("You cannot change the payment status for online paid orders", {type: "warning"})
        }
    };

    const deliveryStatuses = [
        {
            name: "Delivered",
            value: true
        },
        {
            name: "Not delivered",
            value: false
        }
    ]

    const payStatuses = [
        {
            name: "Paid",
            value: true
        },
        {
            name: "Not paid",
            value: false
        }
    ]
    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loadingDelivery || loadingPay}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Row className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                 style={{backgroundColor: "var(--main-gray)"}}>
                {deliveryStatuses?.map(status =>
                    <Col xs={12} onClick={() => changeDeliveryStatus(status.value)}>
                        <Row
                            className={`user-address-card p-2 b-radius-10 ${deliveryStatus === status.value && "isActiveAddress"}`}
                            style={{backgroundColor: "var(--main-white)"}}>
                            <span className="fw-bold">{status.name}</span>
                        </Row>
                    </Col>
                )}

                <Col>
                    <Button className='b-radius-10 btn-dark w-100 mt-2'
                            style={{transition: "0.5s"}} disabled={deliveryStatus === order?.isDelivered}
                            onClick={() => handleChangeDeliveryStatus(deliveryStatus)}>
                        Save changes
                    </Button>
                </Col>
            </Row>

            <Row className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                 style={{backgroundColor: "var(--main-gray)"}}>
                {payStatuses?.map(status =>
                    <Col xs={12} onClick={() => changePayStatus(status.value)}>
                        <Row
                            className={`user-address-card p-2 b-radius-10 ${payStatus === status.value && "isActiveAddress"} ${order?.paymentMethodType === "card" && "bg-opacity-75"}`}
                            style={order?.paymentMethodType === "card" ? {backgroundColor: "var(--main-gray)"} : {backgroundColor: "var(--main-white)"}}>
                            <span className="fw-bold">{status.name}</span>
                        </Row>
                    </Col>
                )}

                <Col>
                    <Button className='b-radius-10 btn-dark w-100 mt-2' style={{transition: "0.5s"}}
                            disabled={payStatus === order?.isPaid}
                            onClick={() => handleChangePayStatus(payStatus)}>
                        Save changes
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default ChangeOrderStatus;