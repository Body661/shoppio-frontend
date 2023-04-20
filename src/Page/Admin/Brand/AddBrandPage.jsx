import {Container, Row, Col} from 'react-bootstrap'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import AddBrand from '../../../Components/Admin/Brand/AddBrand'
import AdminBrands from "../../../Components/Admin/Brand/AdminBrands";

const AddBrandPage = () => {
    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AddBrand/>
                    <AdminBrands/>
                </Col>
            </Row>
        </Container>
    )
}

export default AddBrandPage
