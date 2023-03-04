import React from 'react'
import {Col, Card} from 'react-bootstrap'
import {Link} from "react-router-dom";

const BrandCard = ({img, id}) => {
    return (
        <Col xs={6} sm={6} md={4} lg={2} className="my-2 d-flex justify-content-center">
            <Link to={`/brands/${id}`} style={{textDecoration: 'none'}} className="my-1 brand-card">
                <Card.Img src={img}/>
            </Link>
        </Col>
    )
}

export default BrandCard
