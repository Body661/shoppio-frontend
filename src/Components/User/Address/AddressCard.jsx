import {Col, Row} from 'react-bootstrap';

const AddressCard = ({address, isChosen}) => {
    return (
        <Col xs={12} className={`user-address-card p-2 b-radius-10 ${isChosen === address?._id && "isActiveAddress"}`}
             style={{backgroundColor: "var(--main-white)"}}>
            <Row className="d-flex justify-content-between">
                <span className="fw-bold">{address?.alias}</span>
            </Row>

            <Row className="mt-2">
                    <span>
                        {address?.street}
                    </span>
            </Row>

            <Row className="mt-2">
                    <span>
                        {address?.postalCode} {address?.city}
                    </span>
            </Row>
        </Col>
    );
};

export default AddressCard;
