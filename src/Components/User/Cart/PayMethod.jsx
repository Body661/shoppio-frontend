import {Col, Row} from 'react-bootstrap';

const PayMethod = ({payMethod, isChosen}) => {

    return (
        <Col xs={12} className={`user-address-card p-2 b-radius-10 ${isChosen === payMethod?.value && "isActiveAddress"}`}
             style={{backgroundColor: "var(--main-white)"}}>

            <Row>
                <span className="fw-bold">{payMethod?.name}</span>
            </Row>
        </Col>
    );
};

export default PayMethod;
