import {Container, Row, Col} from 'react-bootstrap'
import AdminSideBar from "../../../Components/Admin/AdminSideBar";
import UpdateCategory from "../../../Components/Admin/Category/UpdateCategory";

const UpdateCategoryPage = () => {
    return (
        <Container style={{minHeight: "80vh"}}>
            <Row className='d-flex flex-row align-items-start products-page-space-between'>
                <Col xs="1" sm="1" md="1">
                    <AdminSideBar/>
                </Col>

                <Col sm="11" xs="10" md="8" lg="9">
                    <UpdateCategory/>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateCategoryPage