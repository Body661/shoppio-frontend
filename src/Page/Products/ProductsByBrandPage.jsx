import React from 'react'
import {Container, Col, Row} from 'react-bootstrap';
import Pagination from '../../Components/Utility/Pagination';
import CardProductsContainer from './../../Components/Products/ProductsContainer';
import {useParams} from 'react-router-dom';
import UseProductsByBrand from "../../hook/products/useProductsByBrand";

const ProductsByBrandPage = () => {
    const {id} = useParams()
    const {items, pagination, onPress} = UseProductsByBrand(id)

    let pageCount = 0;
    if (pagination) pageCount = pagination
    
    return (
        <div style={{minHeight: "80vh"}}>

            <Container>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <CardProductsContainer products={items}/>
                    </Col>
                </Row>

                {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPress}/>}
            </Container>
        </div>
    )
}

export default ProductsByBrandPage
