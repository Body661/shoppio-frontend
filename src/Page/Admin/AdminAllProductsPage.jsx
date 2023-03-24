import React from 'react'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import Pagination from '../../Components/Utility/Pagination'
import ViewProductsAdminHook from "../../hook/admin/useAdminGetProducts";
import AdminAllProductsCard from "../../Components/Admin/AdminAllProductsCard";

const AdminAllProductsPage = () => {
    const {products, pagination, onPress, loading, error} = ViewProductsAdminHook();

    let pageCount
    if (pagination) pageCount = pagination;

    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <div className='admin-content-text'>Manage products</div>

                    {
                        loading && !error && !products && <Spinner animation="border" variant="primary"/>
                    }
                    {
                        !loading && !error && products?.length > 0 ?
                            <Row className='justify-content-start'>
                                {
                                    products?.map((item, index) => <AdminAllProductsCard key={index} item={item}/>)
                                }
                            </Row> : <h4 className="notFound">No Products found</h4>
                    }
                    {
                        !loading && error && !products && <h4 className="error">Something went wrong</h4>
                    }

                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress}/>) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage
