import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import CategoryCard from './CategoryCard';

const CategoryContainer = ({ categories, loading, error }) => {

    let content = null;

    if (loading && !categories && !error) {
        content = <Spinner animation="border" variant="primary" />;

    } else if (!loading && categories?.length) {
        content = categories.map((category) => (
            <CategoryCard key={category._id} id={category._id} title={category.name} img={category.img} />
        ));

    } else if (!loading && !error && !categories) {
        content = <h4 className="notFound">No categories found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <div className="admin-content-text mt-2">All categories</div>
            <Row className="my-2 d-flex">{content}</Row>
        </Container>
    );
};

export default CategoryContainer;
