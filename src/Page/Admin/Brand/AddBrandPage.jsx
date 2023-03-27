import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import AddBrand from '../../../Components/Admin/Brand/AddBrand'
const AddBrandPage = () => {
    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                     <AddBrand />
                </Col>
            </Row>
        </Container>
    )
}

export default AddBrandPage
