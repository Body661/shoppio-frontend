import {Container, Row} from "react-bootstrap";
import React from "react";
import AdminBrandItem from "./adminBrandItem";

function AdminBrandsContainer({brands}) {
    return (
        <Container className="my-3">
            <Row className="my-1 d-flex gap-lg-4 justify-content-center">
                {brands?.map((brand) => <AdminBrandItem brand={brand}/>)}
            </Row>
        </Container>
    );
}

export default AdminBrandsContainer;