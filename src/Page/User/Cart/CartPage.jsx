import {Container, Row, Col, Button} from 'react-bootstrap';
import CartCheckout from '../../../Components/User/Cart/CartCheckout';
import CartItem from '../../../Components/User/Cart/CartItem';
import useUserCart from '../../../hook/user/cart/useUserCart';
import {RemoveShoppingCart, ShoppingCart} from "@mui/icons-material";
import {Link} from "react-router-dom";

const CartPage = () => {
    const {
        itemsAmount,
        cartItems,
        totalCartPrice,
        couponName,
        totalCartPriceAfterDiscount,
    } = useUserCart();

    return (
        <Container style={{minHeight: '80vh'}}>
            <Row>
                <div className="page-header mt-4">
                    <ShoppingCart style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Shopping cart </span>
                </div>
            </Row>

            <Row className="mt-4">
                <Col xs="12" md="12" lg={itemsAmount >= 1 ? "9" : "12"}>
                    {itemsAmount >= 1 ? (
                        <div className="d-flex flex-column gap-2">
                            {cartItems.map((item, index) => <CartItem key={index} item={item}/>)}
                        </div>
                    ) : (
                        <div className="d-flex align-items-center justify-content-center flex-column mt-5">
                            <RemoveShoppingCart style={{fontSize: "90px"}}/>
                            <span className="fs-2 fw-bold mt-2">
                                Your cart is empty
                            </span>
                            <Link to="/products" className="mt-2">
                                <Button variant="dark" className="b-radius-30">
                                    Continue shopping?
                                </Button>
                            </Link>
                        </div>
                    )}
                </Col>
                {itemsAmount >= 1 && <Col xs="12" md="12" lg="3">
                    <CartCheckout
                        AppliedCouponName={couponName}
                        totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
                        totalCartPrice={totalCartPrice}
                        items={itemsAmount}
                    />
                </Col>}
            </Row>
        </Container>
    );
};

export default CartPage;