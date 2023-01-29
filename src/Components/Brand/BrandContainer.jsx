import React from 'react'
import BrandCard from './BrandCard'
import brand1 from "../../images/brand1.png";
import brand2 from "../../images/brand2.png";
import brand3 from "../../images/brand3.png";
import {Container, Row} from 'react-bootstrap';

const BrandContainer = (data) => {
    console.log(data)
    return (
        <Container>
            <div className="admin-content-text mt-2 ">All brands</div>
            <Row className='my-1 d-flex justify-content-between'>
                {
                    data && data?.data?.length > 0 && data?.data?.map((item) => (
                        <BrandCard img={item.img}/>
                    ))
                }

            </Row>
        </Container>
    )
}

export default BrandContainer
