import React from 'react';
import {Container, Row, Spinner} from 'react-bootstrap';
import CubeCard from '../Utility/CubeCard';
import categoriesIcon from '../../imgs/Icons/categories.png';

const CategoryContainer = ({categories, loading, error, isAll}) => {

    let content = null;

    if (loading && !categories && !error) {
        content = <Spinner animation="border" variant="primary"/>;

    } else if (!loading && !error && categories && categories?.length > 0) {
        content = categories.map((category) => (
            <CubeCard key={category._id} id={category._id} title={category.name} img={category.img} url="categories"/>
        ));
    } else if (!loading && !error && (!categories || categories?.length <= 0)) {
        content = <h4 className="notFound">No categories found</h4>;

    } else if (!loading && error && !categories) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            {isAll &&
                <div className="page-header">
                    <img src={categoriesIcon} className="page-header-icon"/>
                    <span className="page-header-text">
                        All categories
                    </span>
                </div>
            }
            <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
};

export default CategoryContainer;
