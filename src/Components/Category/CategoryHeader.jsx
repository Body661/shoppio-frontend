import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import UseHomeCategories from "../../hook/category/useHomeCategories";
import {Link} from "react-router-dom";

const CategoryHeader = () => {
    const {categories} = UseHomeCategories();
    return (
        <div className="cat-header">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-start py-2 flex-wrap">
                        <Link to={`/products`} className="cat-text-header">All</Link>
                        {
                            categories?.data?.data.length > 0 && categories?.data?.data?.map(category => <Link
                                to={`/category/${category?._id}`} key={category._id}
                                className="cat-text-header">{category.name}</Link>)
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CategoryHeader
