import {Container, Col, Row} from "react-bootstrap";

import {Facebook, Instagram, Phone, Twitter} from "@mui/icons-material";

const Footer = () => {
    return (
        <div className="mt-3 pt-2 border-1 border-top" style={{height: "80px"}}>
            <Container className="h-100">
                <Row className="d-flex justify-content-between align-items-center  h-100">
                    <Col md="6" className="d-flex align-items-center ">
                        <div className="footer-conditions ">Terms and Conditions</div>
                        <div className="footer-conditions mx-2">privacy policy</div>
                        <div className="footer-conditions mx-2">call us</div>
                    </Col>
                    <Col
                        md="6"
                        className="d-flex justify-content-end align-items-center gap-1">
                        <Phone/>
                        <Facebook/>
                        <Instagram/>
                        <Twitter/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
