import React, {useState} from 'react'
import {Button, Col, Container, Row} from 'react-bootstrap'
import useViewAddresses from "../../../hook/user/useViewAddresses";
import useUserCart from "../../../hook/user/cart/useUserCart";
import useCashOrder from "../../../hook/user/cart/checkout/useCashOrder";
import useOnlinePay from "../../../hook/user/cart/checkout/useOnlinePay";
import {toast} from "react-toastify";
import {LocalShipping, PaymentOutlined} from "@mui/icons-material";
import AddressCard from "../../../Components/User/Address/AddressCard";
import {Link} from "react-router-dom";
import PayMethod from "../../../Components/User/Cart/PayMethod";
import CompleteOrder from "../../../Components/User/Cart/CompleteOrder";

const ChoosePayMethodPage = () => {
    const {addresses} = useViewAddresses();
    const [type, setType] = useState('');

    const payMethods = [
        {
            id: 1,
            value: "online",
            name: "Online pay"
        },
        {
            id: 2,
            value: "cash",
            name: "Cash"
        }
    ]

    const {
        totalCartPrice,
        couponName,
        totalCartPriceAfterDiscount,
    } = useUserCart();

    const {
        handleChooseAddress,
        addressDetails,
        handleCreateOrderCash,
    } = useCashOrder();

    const {handelCreateOrderOnline} = useOnlinePay(addressDetails);

    const changeMethod = (payMethod) => {
        setType(payMethod);
    };

    const handelPay = () => {
        if (type === 'online') {
            handelCreateOrderOnline();
        } else if (type === 'cash') {
            handleCreateOrderCash();
        } else {
            toast("Please select pay method", {type: 'error'})
        }
    };

    return (
        <Container style={{minHeight: "80vh"}}>
            <Row>
                <div className="page-header mt-4">
                    <LocalShipping style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Shipping address </span>
                </div>
            </Row>

            <Row>
                <Col>
                    <div className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                         style={{backgroundColor: "var(--main-gray)"}}>
                        {addresses?.data?.data?.length > 0 ? (
                            addresses?.data?.data?.map((address) =>
                                <div key={address?._id} onClick={() => handleChooseAddress(address?._id)}>
                                    <AddressCard address={address} isChosen={addressDetails?._id}/>
                                </div>
                            )
                        ) : (<span>No addresses added</span>)}

                        <Link to='/user/add-address'
                              className="mt-3 d-flex justify-content-center">
                            <Button className="btn-outline-light btn-dark b-radius-10"
                                    style={{transition: "0.5s"}}>
                                Add address
                            </Button>
                        </Link>
                    </div>

                    <div>
                        <Col className="page-header mt-4">
                            <PaymentOutlined style={{fontSize: "45px"}}/>
                            <span className="page-header-text"> Pay method </span>
                        </Col>
                    </div>

                    <div className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                         style={{backgroundColor: "var(--main-gray)"}}>
                            {payMethods?.map((payMethod, index) =>
                                <div key={index} onClick={() => changeMethod(payMethod.value)}>
                                    <PayMethod payMethod={payMethod} isChosen={type} key={index}/>
                                </div>)}
                    </div>
                </Col>

                <Col xs="12" md="12" lg={3}>
                    <CompleteOrder
                        AppliedCouponName={couponName}
                        totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
                        totalCartPrice={totalCartPrice}
                        onClick={handelPay}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default ChoosePayMethodPage
