import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import HomeCategoryHook from "../../hook/category/homeCategoryHook";
import {Link} from "react-router-dom";

const CategoryHeader = () => {
    const [categories] = HomeCategoryHook();
    return (
        <div className="cat-header">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-start py-2 flex-wrap">
                        <div className="cat-text-header ">All</div>
                        {
                            categories?.data?.map(category => <Link to={`/products/category/:${category?._id}`}
                                                                    key={category._id}
                                                                    className="cat-text-header">{category.name}</Link>)
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CategoryHeader
