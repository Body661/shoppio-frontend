import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import HomeProducts from '../../Components/Home/HomeProducts'
import Pagination from '../../Components/Utility/Pagination'
import SearchCountResult from '../../Components/Utility/SearchCountResult'
import SideFilter from '../../Components/Utility/SideFilter'
import useSearch from "../../hook/products/useSearch";

const ShopProductsPage = () => {

    const {items, pagination, onPress, getProduct, error, loading} = useSearch();
    let pageCount
    if (pagination) pageCount = pagination;

    return (
        <div style={{minHeight: '670px'}}>
            <CategoryHeader/>
            <Container>
                <SearchCountResult onClick={getProduct} title={` ${items?.length || 0} Search result`}/>
                <Row className='d-flex flex-row search-result-container'>
                    <Col sm="2" xs="2" md="1" className='d-flex search-filter'>
                        <SideFilter/>
                    </Col>
                    <Col sm="10" xs="10" md="11">
                        <HomeProducts products={items} loading={loading} error={error} title="" btntitle=""/>
                    </Col>
                </Row>
                {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPress}/>}
            </Container>
        </div>
    )
}

export default ShopProductsPage
