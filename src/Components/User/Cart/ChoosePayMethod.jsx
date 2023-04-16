import {useState} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import useViewAddresses from '../../../hook/user/useViewAddresses';
import useCashOrder from '../../../hook/user/cart/checkout/useCashOrder';
import useUserCart from '../../../hook/user/cart/useUserCart';
import useOnlinePay from '../../../hook/user/cart/checkout/useOnlinePay';
import {toast} from "react-toastify";
import {LocalShipping, PaymentOutlined} from "@mui/icons-material";
import AddressCard from "../Address/AddressCard";
import {Link} from "react-router-dom";
import PayMethod from "./PayMethod";
import CompleteOrder from "./CompleteOrder";

const ChoosePayMethod = () => {
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
        <>
            <Row>
                <div className="page-header mt-4">
                    <LocalShipping style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Shipping address </span>
                </div>
            </Row>

            <Row>
                <Col>
                    <Row className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                         style={{backgroundColor: "var(--main-gray)"}}>
                        {addresses?.data?.data?.length > 0 ? (
                            addresses?.data?.data?.map((address) =>
                                <div onClick={() => handleChooseAddress(address?._id)}>
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
                    </Row>

                    <Row>
                        <div className="page-header mt-4">
                            <PaymentOutlined style={{fontSize: "45px"}}/>
                            <span className="page-header-text"> Pay method </span>
                        </div>
                    </Row>

                    <Row className='mt-2 p-3 b-radius-20 d-flex flex-column gap-2'
                         style={{backgroundColor: "var(--main-gray)"}}>
                        {payMethods?.map(payMethod =>
                            <div onClick={() => changeMethod(payMethod.value)}>
                                <PayMethod payMethod={payMethod} isChosen={type}/>
                            </div>)}
                    </Row>
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
        </>
    )
}

export default ChoosePayMethod


