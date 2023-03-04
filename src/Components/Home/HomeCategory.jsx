import React from 'react'
import {Container, Row, Spinner} from 'react-bootstrap';
import SubTitle from '../Uitily/SubTitle'
import UseHomeCategories from "../../hook/category/useHomeCategories";
import CategoryCard from "../Category/CategoryCard";

const HomeCategory = ({title, btnTitle, path}) => {

    const {categories, loading, error} = UseHomeCategories();

    let content;

    if (loading && !categories && !error) {
        content = <Spinner animation="border" variant="primary" />;

    } else if (!loading && categories?.length) {
        content = categories.map((category) => (
            <CategoryCard key={category._id} img={category.img} title={category.name} id={category._id} />
        ));

    } else if (!loading && !error && !categories) {
        content = <h4 className="notFound">No categories found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={path} />
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
}

export default HomeCategory
