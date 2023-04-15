import React from 'react'
import {Container, Row, Spinner} from 'react-bootstrap';
import CubeCard from "../Utility/CubeCard";
import brandsIcon from "../../imgs/Icons/brands.png";

const BrandsContainer = ({brands, loading, error, isAll}) => {

    let content = null;

    if (loading && !brands && !error) {
        content = <Spinner animation="border" variant="primary"/>;

    } else if (!loading && !error && brands && brands?.length) {
        content = brands.map((brand) => (
            <CubeCard key={brand?._id} img={brand?.img} id={brand?._id} title={brand?.name} url="brands"/>
        ));

    } else if (!loading && !error && brands && !brands?.length) {
        content = <h4 className="notFound">No brands found</h4>;

    } else {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>
            {isAll &&
                <div className="page-header">
                    <img src={brandsIcon} className="page-header-icon"/>
                    <span className="page-header-text">
                        All brands
                    </span>
                </div>
            } <Row className="my-1 d-flex justify-content-center">{content}</Row>
        </Container>
    );
}

export default BrandsContainer
