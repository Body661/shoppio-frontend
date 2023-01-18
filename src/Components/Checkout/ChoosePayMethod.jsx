import React from 'react'
import {Row, Col} from 'react-bootstrap'

const ChoosePayMethod = () => {
    return (
        <div>
            <div className="admin-content-text pt-5">Choose payment method</div>
            <div className="user-address-card my-3 px-3">
                <Row className="d-flex justify-content-between ">
                    <Col xs="12" className="my-4">
                        <input
                            name="group"
                            id="group1"
                            type="radio"
                            value="Credit card"
                            className="mt-2"
                        />
                        <label className="mx-2" for="group1">
                            Pay with Credit Card Or Bank account
                        </label>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" className="d-flex">
                        <input
                            name="group"
                            id="group2"
                            type="radio"
                            value="cash"
                            className="mt-2"
                        />
                        <label className="mx-2" for="group2">
                            Cash
                        </label>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col xs="12" className="d-flex justify-content-end">
                    <div className="product-price d-inline border">3000 EUR</div>
                    <div className="product-cart-add px-3 pt-2 d-inline me-2">Complete payment</div>
                </Col>
            </Row>
        </div>
    )
}

export default ChoosePayMethod
