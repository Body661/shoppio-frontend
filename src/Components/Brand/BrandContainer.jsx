import React from 'react'
import BrandCard from './BrandCard'
import {Container, Row, Spinner} from 'react-bootstrap';

const BrandContainer = ({brands, loading, error, isAll}) => {

    let content = null;

    if (loading && !brands && !error) {
        content = <Spinner animation="border" variant="primary" />;

    } else if (!loading && !error && brands && brands?.length) {
        content = brands.map((brand) => (
            <BrandCard key={brand?._id} img={brand?.img} id={brand?._id} title={brand?.name}/>
        ));

    } else if (!loading && !error && brands && !brands?.length) {
        content = <h4 className="notFound">No brands found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            {isAll && <div className="admin-content-text mt-2">All brands</div>}
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
}

export default BrandContainer
