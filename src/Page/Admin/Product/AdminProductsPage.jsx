import React from 'react'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import AdminSideBar from '../../../Components/Admin/AdminSideBar'
import Pagination from '../../../Components/Utility/Pagination'
import useAdminGetProducts from "../../../hook/admin/Product/useAdminGetProducts";
import AdminProductsCard from "../../../Components/Admin/Product/AdminProductsCard";
import {Link} from "react-router-dom";

const AdminProductsPage = () => {
    const {products, pagination, onPress, loading, error} = useAdminGetProducts();

    let pageCount
    if (pagination) pageCount = pagination;

    return (
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='admin-content-text'>Manage products</div>
                        <Link className='product-cart-add px-3 py-3 mx-3' to='/admin/addProduct'>Add new product</Link>
                    </div>
                    {
                        loading && !error && !products && <Spinner animation="border" variant="primary"/>
                    }
                    {
                        !loading && !error && products &&
                        (
                            products?.length > 0 ?
                                <Row className='justify-content-start'>
                                    {
                                        products?.map((item, index) => <AdminProductsCard key={index} item={item}/>)
                                    }
                                </Row> : <h4 className="notFound">No Products found</h4>
                        )
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

export default AdminProductsPage
