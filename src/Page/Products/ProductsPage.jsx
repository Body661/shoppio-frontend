import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import Pagination from '../../Components/Utility/Pagination'
import SearchCountResult from '../../Components/Utility/SearchCountResult'
import SideFilter from '../../Components/Utility/SideFilter'
import useSearch from "../../hook/products/useSearch";
import ProductsContainer from "../../Components/Products/ProductsContainer";

const ProductsPage = () => {

    const {items, pagination, onPress, getProduct, error, loading} = useSearch();
    let pageCount
    if (pagination) pageCount = pagination;

    return (
        <div style={{minHeight: '670px'}}>
            <CategoryHeader/>
            <Container>
                <SearchCountResult onClick={getProduct} title={` ${items?.length || 0} Search result`}/>
                <Row className='d-flex flex-row justify-content-between align-items-start'>
                    <Col sm="2" xs="2" md="1" className='d-flex'>
                        <SideFilter/>
                    </Col>
                    <Col sm="10" xs="10" md="8" lg={9}>
                        <ProductsContainer products={items} loading={loading} error={error} xSmall={10} small={8} medium={6} large={4}/>
                    </Col>
                </Row>
                {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPress}/>}
            </Container>
        </div>
    )
}

export default ProductsPage
