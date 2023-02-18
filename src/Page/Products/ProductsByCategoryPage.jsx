import React from 'react'
import {Container, Col, Row} from 'react-bootstrap';
import Pagination from '../../Components/Uitily/Pagination';
import CardProductsContainer from './../../Components/Products/ProductsContainer';
import {useParams} from 'react-router-dom';
import ProductsByCategoryHook from "../../hook/products/productsByCategoryHook";

const ProductsByCategoryPage = () => {

    const {id} = useParams()

    const [items, pagination, onPress] = ProductsByCategoryHook(id)

    let pageCount = 0;
    if (pagination) pageCount = pagination

    return (
        <div style={{minHeight: '670px'}}>

            <Container>
                <Row className='d-flex flex-row'>

                    <Col sm="12">
                        <CardProductsContainer products={items} title="" btntitle=""/>
                    </Col>
                </Row>

                <Pagination pageCount={pageCount} onPress={onPress}/>
            </Container>
        </div>
    )
}

export default ProductsByCategoryPage