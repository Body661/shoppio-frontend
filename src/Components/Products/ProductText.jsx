import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProductDetails from '../../hook/products/useProductDetails';
import UseAddToCart from '../../hook/user/cart/useAddToCart';

const ProductText = () => {
    const { id } = useParams();
    const {product} = useProductDetails(id);
    const { colorClick, indexColor, addToCartHandle } = UseAddToCart(id, product);

    return (
        <div>
            <Row className="mt-2">
                <div className="cat-text"> Category: {product?.category?.name} </div>
            </Row>
            <Row>
                <Col md="8">
                    <div className="cat-title d-inline">
                        {product?.title}
                        <div className="cat-rate d-inline mx-3">{product?.ratingsQuantity}</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="8" className="mt-4">
                    <div className="cat-text d-inline">Brand :</div>
                    <div className="brand-text d-inline mx-1">
                        {product?.brand?.name ?? 'unknown'}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="8" className="mt-1 d-flex">
                    {product?.colors &&
                        product.colors.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => colorClick(index, color)}
                                className="color ms-2 border"
                                style={{
                                    backgroundColor: color,
                                    border: indexColor === index ? '3px solid black' : 'none',
                                }}
                            ></div>
                        ))}
                    <div className="cat-text d-inline">
                        Available quantity : {product?.quantity}
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <div className="cat-text">Description :</div>
            </Row>
            <Row className="mt-2">
                <Col md="10">
                    <div className="product-description d-inline">
                        {product?.description}
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="12">
                    {product?.priceAfterDiscount >= 1 ? (
                        <>
              <span style={{ textDecorationLine: 'line-through' }}>
                {product?.price}
              </span>{' '}
                            {product?.priceAfterDiscount}
                        </>
                    ) : (
                        product?.price
                    )}{' '}
                    Euro
                    <div
                        onClick={addToCartHandle}
                        className="product-cart-add px-3 py-3 d-inline mx-3"
                    >
                        Add to cart
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductText;
