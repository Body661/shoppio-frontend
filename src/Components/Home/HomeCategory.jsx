import React from 'react'
import {Container, Row} from 'react-bootstrap';
import SubTitle from '../Uitily/SubTitle'
import CategoryCard from '../Category/CategoryCard';
import clothe from "../../images/clothe.png";
import cat2 from "../../images/cat2.png";
import labtop from "../../images/labtop.png";
import sale from "../../images/sale.png";
import pic from "../../images/pic.png";

const HomeCategory = () => {
    return (
        <Container>
            <SubTitle title="Categories" btnTitle="more" pathText="/allCategory"/>
            <Row className='my-2 d-flex justify-content-between'>
                <CategoryCard title="Category" img={clothe} background="#F4DBA4"/>
                <CategoryCard title="Category" img={cat2} background="#F4DBA4"/>
                <CategoryCard title="Category" img={labtop} background="#0034FF"/>
                <CategoryCard title="Category" img={sale} background="#F4DBA4"/>
                <CategoryCard title="Category" img={clothe} background="#FF6262"/>
                <CategoryCard title="Category" img={pic} background="#F4DBA4"/>
            </Row>
        </Container>
    )
}

export default HomeCategory
