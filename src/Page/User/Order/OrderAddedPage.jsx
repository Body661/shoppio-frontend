import {Container, Row} from 'react-bootstrap'
import {useParams} from "react-router-dom";

const UserOrderPage = () => {
    const {id} = useParams();

    return (
        <Container style={{minHeight: "80vh"}}
                   className='d-flex flex-column align-items-center justify-content-center'>
            <Row className="d-flex flex-column justify-content-center text-center gap-3">
                <h1>Order received</h1>
                <p>Thank you. Your order has bee received</p>
                <p>It may take a few minutes for your order to appear on the orders page.</p>
            </Row>
        </Container>
    )
}


export default UserOrderPage
