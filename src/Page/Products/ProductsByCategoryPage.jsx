import React from 'react'
import {Container, Col, Row} from 'react-bootstrap';
import Pagination from '../../Components/Utility/Pagination';
import CardProductsContainer from './../../Components/Products/ProductsContainer';
import {useParams} from 'react-router-dom';
import UseProductsByCategory from "../../hook/products/useProductsByCategory";

const ProductsByCategoryPage = () => {
    const {id} = useParams()
    const {items, pagination, onPress, loading} = UseProductsByCategory(id)

    return (
        <div style={{minHeight: "80vh"}}>

            <Container>
                <Row className='d-flex flex-row justify-content-center'>
                    <Col>
                        <CardProductsContainer products={items} loading={loading}/>
                    </Col>
                </Row>

                {pagination > 1 && <Pagination pageCount={pagination} onPress={onPress}/>}
            </Container>
        </div>
    )
}

export default ProductsByCategoryPage