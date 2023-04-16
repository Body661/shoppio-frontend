import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from "react-router-dom";

const UserOrdersCard = ({item}) => {
    return (
        <div>
            <Row className="d-flex mb-2">
                <Col xs="3" md="2" className="d-flex justify-content-start">
                    <Link to={`/products/${item?.product?._id}`}>
                        <img width="93px" height="120px" src={item?.product?.cover} alt=""/>
                    </Link>
                </Col>
                <Col xs="8" md="6">
                    <div className="d-inline pt-2 cat-title">
                        {item?.product?.title || ''}
                    </div>
                    <div className="d-inline pt-2 cat-rate me-2">{item?.product?.ratingsAvg ?
                        item?.product?.ratingsAvg : 0}</div>
                    <div className="rate-count d-inline p-1 pt-2">({`${item?.product?.ratingsQuantity || 0} reviews`})
                    </div>
                    <div className="mt-3">
                        <div className="xs-black-text mt-1">Quantity: {item?.quantity}</div>
                        <div className="color" style={{backgroundColor: item?.color}}></div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserOrdersCard
