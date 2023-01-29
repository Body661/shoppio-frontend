import React from 'react'
import {Col, Card} from 'react-bootstrap'

const BrandCard = ({img, id}) => {
    return (
        <Col
            xs="6"
            sm="6"
            md="4"
            lg="2"
            key={id}
            className="my-2 d-flex justify-content-center">
            <div
                className="my-1 brand-card"
                style={{
                    width: "100%",
                    height: "151px",
                    borderRadius: "8px",
                    border: "none",
                }}>
                <Card.Img src={img}/>
            </div>
        </Col>
    )
}

export default BrandCard
