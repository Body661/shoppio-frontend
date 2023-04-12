import {Container, Row, Col} from 'react-bootstrap'
import AdminSideBar from "../../../Components/Admin/AdminSideBar";
import UpdateBrand from "../../../Components/Admin/Brand/UpdateBrand";

const UpdateCategoryPage = () => {
    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <UpdateBrand/>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateCategoryPage