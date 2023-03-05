import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAllProducts from '../../Components/Admin/AdminAllProducts'
import Pagination from '../../Components/Uitily/Pagination'
import ViewProductsAdminHook from "../../hook/admin/useAdminGetProducts";

const AdminAllProductsPage = () => {
    const [items, pagination, onPress] = ViewProductsAdminHook();

    let pageCount
    if (pagination) pageCount = pagination;

    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAllProducts products={items}/>
                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress}/>) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage
