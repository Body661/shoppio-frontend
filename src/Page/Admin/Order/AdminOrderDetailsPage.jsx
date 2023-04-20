import {Container, Row, Col} from 'react-bootstrap'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import OrderDetails from "../../../Components/Order/OrderDetails";

const AdminOrderDetailsPage = () => {
    return (
        <Container style={{minHeight: "80vh"}}>
            <Row className='d-flex flex-row align-items-start products-page-space-between'>
                <Col xs="1" sm="1" md="1">
                    <AdminSideBar/>
                </Col>

                <Col sm="11" xs="10" md="8" lg="9">
                    <OrderDetails isAdmin={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminOrderDetailsPage
