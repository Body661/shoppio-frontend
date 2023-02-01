import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import HomeCategoryHook from "../../hook/category/homeCategoryHook";

const CategoryHeader = () => {
    const [categories] = HomeCategoryHook();
    return (
        <div className="cat-header">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-start py-2 flex-wrap">
                        <div className="cat-text-header ">All</div>
                        {
                            categories?.data?.map(category => <div className="cat-text-header">{category.name}</div>)
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CategoryHeader
