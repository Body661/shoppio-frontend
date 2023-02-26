import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ApplyCouponHook from '../../hook/cart/useApplyCoupon';
import {ToastContainer} from 'react-toastify';
import useDeleteCart from "../../hook/cart/useDeleteCart";

const CartCheckout = ({totalCartPrice, totalCartPriceAfterDiscount, couponNameRes, items}) => {
    const {handleClearCart} = useDeleteCart();
    const {couponName, onChangeCoupon, handleSubmitCoupon} = ApplyCouponHook();

    useEffect(() => {
        if (couponNameRes) {
            onChangeCoupon(couponNameRes);
        }
    }, [couponNameRes]);

    if (items > 0) return (
        <Row className='my-1 d-flex justify-content-center cart-checkout pt-4 pb-4'>
            <Col xs='12' className='d-flex flex-column'>
                <div className='d-flex'>
                    <input
                        value={couponName}
                        onChange={(e) => onChangeCoupon(e.target.value)}
                        className='coupon-input d-inline text-center '
                        placeholder='Coupon Name'
                    />
                    <button onClick={handleSubmitCoupon} className='coupon-btn d-inline '>
                        Apply
                    </button>
                </div>
                <div className='product-price d-inline w-100 my-3  border'>
                    {totalCartPriceAfterDiscount >= 1
                        ? `${totalCartPrice} Euro ... After discount: ${totalCartPriceAfterDiscount}`
                        : `${totalCartPrice} Euro`}
                </div>
                <Link to='/order/payMethod' style={{textDecoration: 'none'}} className='product-cart-add  d-inline '>
                    <button className='product-cart-add w-100 px-2'>Complete order</button>
                </Link>

                <button onClick={handleClearCart} className='product-cart-add w-100 px-2 my-1'>
                    Clear cart
                </button>
            </Col>
            <ToastContainer/>
        </Row>
    );

    return null;
};

export default CartCheckout;
