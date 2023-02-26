import { Container, Row, Spinner } from 'react-bootstrap';
import SubTitle from '../Uitily/SubTitle';
import BrandCard from '../Brand/BrandCard';
import {useHomeBrands} from '../../hook/brand/useHomeBrands';
import React from "react";

const HomeBrands = ({ title, btnTitle, path }) => {
    const { brands, loading, error} = useHomeBrands();

    return (
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={path} />
            <Row className='my-1 d-flex justify-content-center'>
                {loading && !brands && !error && <Spinner animation="border" variant="primary"/>}
                {!loading && !error && (
                    brands?.length > 0 ? (
                        brands?.map((item) => (
                            <BrandCard key={item._id} img={item.img} id={item._id} />
                        ))
                    ) : <h4 className='notFound'>No brands found</h4>
                )}
                {!loading && !brands && error && <h4 className='error'>Something went wrong</h4>}
            </Row>
        </Container>
    );
};

export default HomeBrands;
