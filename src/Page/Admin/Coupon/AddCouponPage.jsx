import { Container, Row, Col } from 'react-bootstrap'
import AddCoupon from '../../../Components/Admin/Coupon/AddCoupon'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
const AddCouponPage = () => {
    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AddCoupon />
                </Col>
            </Row>
        </Container>
    )
}

export default AddCouponPage