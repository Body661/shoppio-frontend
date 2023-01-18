import React from 'react'
import { Container, Row } from 'react-bootstrap'
import CategoryCard from './CategoryCard';
import clothe from "../../images/clothe.png";
import cat2 from "../../images/cat2.png";
import labtop from "../../images/labtop.png";
import sale from "../../images/sale.png";
import pic from "../../images/pic.png";
const CategoryContainer = () => {
    return (
        <Container >
        <div className="admin-content-text mt-2 ">All categories</div>
            <Row className='my-2 d-flex justify-content-between'>
                <CategoryCard title="Category" img={clothe} background="#F4DBA4" />
                <CategoryCard title="Category" img={cat2} background="#F4DBA4" />
                <CategoryCard title="Category" img={labtop} background="#0034FF" />
                <CategoryCard title="Category" img={sale} background="#F4DBA4" />
                <CategoryCard title="Category" img={clothe} background="#FF6262" />
                <CategoryCard title="Category" img={pic} background="#F4DBA4" />
                <CategoryCard title="Category" img={clothe} background="#F4DBA4" />
                <CategoryCard title="Category" img={cat2} background="#F4DBA4" />
                <CategoryCard title="Category" img={labtop} background="#0034FF" />
                <CategoryCard title="Category" img={sale} background="#F4DBA4" />
                <CategoryCard title="Category" img={clothe} background="#FF6262" />
                <CategoryCard title="Category" img={pic} background="#F4DBA4" />
                <CategoryCard title="Category" img={clothe} background="#F4DBA4" />
                <CategoryCard title="Category" img={cat2} background="#F4DBA4" />
                <CategoryCard title="Category" img={labtop} background="#0034FF" />
                <CategoryCard title="Category" img={sale} background="#F4DBA4" />
                <CategoryCard title="Category" img={clothe} background="#FF6262" />
                <CategoryCard title="Category" img={pic} background="#F4DBA4" />
            </Row>
        </Container>
    )
}

export default CategoryContainer
