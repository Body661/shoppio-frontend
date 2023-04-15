import React from 'react'
import {Container, Col, Row} from 'react-bootstrap';
import Pagination from '../../Components/Utility/Pagination';
import CardProductsContainer from './../../Components/Products/ProductsContainer';
import {useParams} from 'react-router-dom';
import UseProductsByCategory from "../../hook/products/useProductsByCategory";

const ProductsByCategoryPage = () => {

    const {id} = useParams()

    const {items, pagination, onPress} = UseProductsByCategory(id)

    let pageCount = 0;
    if (pagination) pageCount = pagination

    return (
        <div style={{minHeight: "80vh"}}>

            <Container>
                <Row className='d-flex flex-row justify-content-center'>
                    <Col>
                        <CardProductsContainer products={items}/>
                    </Col>
                </Row>

                {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPress}/>}
            </Container>
        </div>
    )
}

export default ProductsByCategoryPage