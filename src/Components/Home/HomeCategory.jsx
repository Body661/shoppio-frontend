import React from 'react'
import {Container, } from 'react-bootstrap';
import SectionTitle from '../Utility/SectionTitle'
import UseHomeCategories from "../../hook/category/useHomeCategories";
import CategoryContainer from "../Category/CategoryContainer";

const HomeCategory = ({title, btnTitle, path}) => {
    const {categories, loading, error} = UseHomeCategories();

    return (
        <Container>
            <SectionTitle title={title} btnTitle={btnTitle} pathText={path} />
            <CategoryContainer categories={categories} loading={loading} error={error} />
        </Container>
    );
}

export default HomeCategory
