import React from 'react'
import {Row, Col} from 'react-bootstrap'

const ProductText = () => {
    return (
        <div>
            <Row className="mt-2">
                <div className="cat-text">Electronics :</div>
            </Row>
            <Row>
                <Col md="8">
                    <div className="cat-title d-inline">
                        Iphone XR
                        <div className="cat-rate d-inline mx-3">4.5</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="8" className="mt-4">
                    <div className="cat-text d-inline">Brand :</div>
                    <div className="brand-text d-inline mx-1">Apple</div>
                </Col>
            </Row>
            <Row>
                <Col md="8" className="mt-1 d-flex">
                    <div
                        className="color ms-2 border"
                        style={{backgroundColor: "#E52C2C"}}></div>
                    <div
                        className="color ms-2 border "
                        style={{backgroundColor: "white"}}></div>
                    <div
                        className="color ms-2 border"
                        style={{backgroundColor: "black"}}></div>
                </Col>
            </Row>

            <Row className="mt-4">
                <div className="cat-text">Description :</div>
            </Row>
            <Row className="mt-2">
                <Col md="10">
                    <div className="product-description d-inline">
                        Features dual SIM physical card and e-SIM You can unlock your iPhone and log in to apps,
                        accounts and more easily, and Face ID is the fastest and most secure feature for face
                        authentication Features A12 Bionic chip, which is the smartest and most powerful chip in a
                        smartphone Formed more World famous cameras A new era of photography Powered by the innovative
                        ISP sensor and neural engine, you can capture images like never before Single lens camera Brings
                        the people in the front into sharp focus against the blurred background Overview
                    </div>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md="12">
                    <div className="product-price d-inline px-3 py-3 border">800 EUR</div>
                    <div className="product-cart-add px-3 py-3 d-inline mx-3">Add to cart</div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductText
