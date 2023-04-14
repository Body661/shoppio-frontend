import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'

const AdSection = ({text, img, textStyles, imgStyles}) => {
    return (
        <Container>
            <Row className="ad-backcolor my-3  mx-2 d-flex text-center align-items-center">
                <Col>
                    <div className={textStyles}>
                        {text}
                    </div>
                </Col>
                <Col>
                    <img className={imgStyles} src={img} alt="ad img"/>
                </Col>
            </Row>
        </Container>
    )
}

export default AdSection
