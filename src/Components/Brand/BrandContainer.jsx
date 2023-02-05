import React from 'react'
import BrandCard from './BrandCard'
import {Container, Row} from 'react-bootstrap';

const BrandContainer = (data) => {
    return (
        <Container>
            <div className="admin-content-text mt-2 ">All brands</div>
            <Row className='my-1 d-flex'>
                {
                    data && data?.data?.length > 0 && data?.data?.map((item) => (
                        <BrandCard img={item.img} key={item?._id}/>
                    ))
                }

            </Row>
        </Container>
    )
}

export default BrandContainer
