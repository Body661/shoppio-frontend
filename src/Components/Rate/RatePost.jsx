import React from 'react'
import {Col, Row} from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const RatePost = () => {

    const setting = {
        size: 20,
        count: 5,
        color: "#979797",
        activeColor: "#ffc107",
        value: 7.5,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star"/>,
        halfIcon: <i className="fa fa-star-half-alt"/>,
        filledIcon: <i className="fa fa-star"/>,
        onChange: newValue => {
            console.log(`Example 2: new value is ${newValue}`);
        }
    };
    return (
        <div>
            <Row className="mt-3 ">
                <Col sm="12" className="me-5  d-flex">
                    <div className="rate-name  d-inline ms-3 mt-1 ">Abdolrahman</div>
                    <ReactStars {...setting} />
                </Col>
            </Row>
            <Row className="border-bottom mx-2">
                <Col className="d-flex me-4 pb-2">
            <textarea
                className="input-form-area p-2 mt-3"
                rows="2"
                cols="20"
                placeholder="Write your review"
            />
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="product-cart-add px-3  py-2 text-center d-inline">Submit review</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RatePost