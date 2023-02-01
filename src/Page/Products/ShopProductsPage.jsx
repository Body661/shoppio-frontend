import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import HomeProducts from '../../Components/Home/HomeProducts'
import Pagination from '../../Components/Uitily/Pagination'
import SearchCountResult from '../../Components/Uitily/SearchCountResult'
import SideFilter from '../../Components/Uitily/SideFilter'
import ViewSearchProductsHook from "../../hook/products/searchProductsHook";

const ShopProductsPage = () => {

    const [items, pagination, onPress, getProduct] = ViewSearchProductsHook();
    console.log(pagination)
    let pageCount
    if (pagination) pageCount = pagination;

    return (
        <div style={{minHeight: '670px'}}>
            <CategoryHeader/>
            <Container>
                <SearchCountResult onClick={getProduct} title={` ${items.length} Search result`}/>
                <Row className='d-flex flex-row'>
                    <Col sm="2" xs="2" md="1" className='d-flex'>
                        <SideFilter/>
                    </Col>
                    <Col sm="10" xs="10" md="11">
                        <HomeProducts products={items} title="" btntitle=""/>
                    </Col>
                </Row>
                <Pagination pageCount={pageCount} onPress={onPress}/>
            </Container>
        </div>
    )
}

export default ShopProductsPage
