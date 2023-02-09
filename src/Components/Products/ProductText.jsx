import React from 'react'
import {Row, Col} from 'react-bootstrap'
import ViewProductsDetailsHook from "../../hook/products/productDetailsHook";
import {useParams} from "react-router-dom";
import AddToCartHook from "../../hook/cart/addToCartHook";

const ProductText = () => {
    const {id} = useParams();
    const [product] = ViewProductsDetailsHook(id);
    const [colorClick, indexColor, addToCartHandel] = AddToCartHook(id, product)

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
                    <div
                        className="brand-text d-inline mx-1">{product?.brand?.name ? product?.brand?.name : "unknown"} </div>
                </Col>
            </Row>
            <Row>
                <Col md="8" className="mt-1 d-flex">
                    {
                        product?.colors ? (product?.colors.map((color, index) => {
                            return (<div
                                key={index}
                                onClick={() => colorClick(index, color)}
                                className="color ms-2 border"
                                style={{
                                    backgroundColor: color,
                                    border: indexColor === index ? '3px solid black' : 'none'
                                }}></div>)
                        })) : null
                    }


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
                    <div className="product-price d-inline px-3 py-3 border">{product?.price} Euro</div>
                    <div onClick={addToCartHandel} className="product-cart-add px-3 py-3 d-inline mx-3">Add to cart
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductText
