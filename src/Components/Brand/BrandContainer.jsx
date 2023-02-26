import React from 'react'
import BrandCard from './BrandCard'
import {Container, Row, Spinner} from 'react-bootstrap';

const BrandContainer = ({brands, loading, error}) => {
    return (
        <Container>
            <div className="admin-content-text mt-2 ">All brands</div>
            <Row className='my-1 d-flex'>
                {loading && !brands && !error && <Spinner animation='border' variant='primary'/>}
                {!loading && !error && (
                    brands?.length > 0 ? (
                        brands?.map((item) => (
                            <BrandCard key={item._id} img={item.img} id={item._id}/>
                        ))
                    ) : <h4 className='notFound'>No brands found</h4>
                )}
                {!loading && !brands && error && <h4 className='error'>Something went wrong</h4>}

            </Row>
        </Container>
    )
}

export default BrandContainer
