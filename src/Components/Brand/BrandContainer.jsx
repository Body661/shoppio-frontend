import React from 'react'
import BrandCard from './BrandCard'
import {Container, Row, Spinner} from 'react-bootstrap';

const BrandContainer = ({brands, loading, error}) => {

    let content = null;

    if (loading && !brands && !error) {
        content = <Spinner animation="border" variant="primary" />;

    } else if (!loading && brands?.length) {
        content = brands.map((brand) => (
            <BrandCard key={brand._id} img={brand.img} id={brand._id}/>
        ));

    } else if (!loading && !error && !brands) {
        content = <h4 className="notFound">No brands found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <div className="admin-content-text mt-2">All brands</div>
            <Row className="my-2 d-flex">{content}</Row>
        </Container>
    );
}

export default BrandContainer
