import React from 'react'
import {Col} from 'react-bootstrap'
import {Link} from "react-router-dom";

const BrandCard = ({img, id, title}) => (
    <Col xs={6} sm={6} md={4} lg={2} className="my-4 d-flex justify-content-around">
        <div className="allCard mb-3">

        <Link to={`/brands/${id}`} style={{textDecoration: 'none'}}>
            <div
                className="brand-card"
                style={{ backgroundImage: `URL(${img})` }}
            />

            <p className="category-card-text my-2">{title}</p>
        </Link>

        </div>
    </Col>
)


export default BrandCard
