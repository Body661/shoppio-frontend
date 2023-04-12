import {Container, Row} from "react-bootstrap";
import React from "react";
import AdminCategoryItem from "./adminCategoryItem";

function AdminCategoriesContainer({categories}) {
    return (
        <Container className="my-3">
            <Row className="my-1 d-flex gap-lg-4 justify-content-center">
                {categories?.map((category) => <AdminCategoryItem category={category}/>)}
            </Row>
        </Container>
    );
}

export default AdminCategoriesContainer;