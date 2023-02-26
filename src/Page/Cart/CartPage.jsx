import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartCheckout from '../../Components/Cart/CartCheckout';
import CartItem from '../../Components/Cart/CartItem';
import useUserCart from '../../hook/cart/useUserCart';

const CartPage = () => {
    const {cartItems, totalCartPrice, couponNameRes, totalCartPriceAfterDiscount} = useUserCart();

    return (
        <Container style={{ minHeight: '670px' }}>
            <Row>
                <div className="cart-title mt-4">Shopping cart</div>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs="12" md="9">
                    {cartItems.length >= 1 ? (
                        cartItems.map((item, index) => <CartItem key={index} item={item} />)
                    ) : (
                        <h6>No products added to your cart</h6>
                    )}
                </Col>
                <Col xs="6" md="3">
                    <CartCheckout
                        couponNameRes={couponNameRes}
                        totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
                        totalCartPrice={totalCartPrice}
                        items={cartItems?.length}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;