import React, {useEffect} from 'react';
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import useApplyCoupon from '../../../hook/user/cart/useApplyCoupon';
import useDeleteCart from "../../../hook/user/cart/useDeleteCart";

const CartCheckout = ({totalCartPrice, totalCartPriceAfterDiscount, AppliedCouponName}) => {
    const {handleClearCart} = useDeleteCart();
    const {couponName, onChangeCoupon, handleSubmitCoupon} = useApplyCoupon();

    useEffect(() => {
        if (AppliedCouponName) {
            onChangeCoupon(AppliedCouponName);
        }
    }, [AppliedCouponName]);

    return (
        <Row className='my-1 d-flex justify-content-center p-2'>
            <Col xs='12' className='d-flex flex-column b-radius-20 p-2' style={{background: "var(--main-gray)"}}>
                <span className="fw-bold fs-4">Overview</span>

                <div className='w-100 d-flex justify-content-between mt-3'>
                    <span>Total price</span>
                    <span className="fw-bold">{totalCartPrice}</span>
                </div>

                {totalCartPriceAfterDiscount > 0 && <div className='w-100 d-flex justify-content-between mt-3'>
                    <span>After discount</span>
                    <span className="fw-bold">${totalCartPriceAfterDiscount}</span>
                </div>}

                <div className='mt-3 pb-2 border-bottom border-dark'>
                    <FormControl
                        className="b-radius-10"
                        type="text"
                        value={couponName}
                        onChange={(e) => onChangeCoupon(e.target.value)}
                        placeholder='Coupon code'
                    />

                    <Button onClick={handleSubmitCoupon} className='btn-outline-light b-radius-10 btn-dark w-100 mt-2'
                            style={{transition: "0.5s"}}>
                        Apply
                    </Button>
                </div>

                <Link to='/cart/pay-method' className="mt-2">
                    <Button className="btn-outline-light btn-dark b-radius-10 w-100"
                            style={{transition: "0.5s"}}>
                        Complete order
                    </Button>
                </Link>

                <Button onClick={handleClearCart} className="btn-outline-light btn-dark b-radius-10 w-100 mt-2"
                        style={{transition: "0.5s"}}>
                    Clear cart
                </Button>
            </Col>
        </Row>
    );
};

export default CartCheckout;
