import {Col, Container, Row, Spinner} from 'react-bootstrap'
import SectionTitle from '../Utility/SectionTitle'
import HomeProductCard from './HomeProductCard'
import React from "react";

const ProductsContainer = ({title, btnTitle, pathText, products, loading, error, xSmall = 8, small = 6, medium = 4, large = 3}) => {
    let content = null;

    if (loading && !products && !error) {
        content = <Spinner animation="border" variant="primary"/>;
    } else if (!loading && !error && products && products?.length > 0) {
        content = products?.map((item, index) => (
            <Col xs={xSmall} sm={small} md={medium} lg={large}>
                <HomeProductCard key={index} item={item}/>
            </Col>
        ))

    } else if (!loading && !error && (products && products?.length <= 0)) {
        content = <h4 className="notFound">No products found</h4>;

    } else if (!loading && error && !products) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            {title ? (<SectionTitle title={title} btntitle={btnTitle} pathText={pathText}/>) : null}
            <Row className="d-flex justify-content-center">
                {content}
            </Row>
        </Container>
    )
}

export default ProductsContainer