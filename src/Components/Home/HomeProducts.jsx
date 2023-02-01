import React from 'react'
import {Container, Row, Spinner} from 'react-bootstrap'
import SubTitle from '../Uitily/SubTitle'
import ProductCard from '../Products/ProductCard'

const HomeProducts = ({title, btnTitle, pathText, products, loading, error}) => {


    return (
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={pathText}/>
            <Row className='my-2 d-flex'>
                {
                    loading && !error && !products && <Spinner animation="border" variant="primary"/>
                }
                {
                    !loading && !error && (
                        products ? (
                            products?.map((item, index) => (<ProductCard key={index} item={item}/>))
                        ) : <h4 className="notFound">No Products found</h4>
                    )
                }
                {
                    !loading && error && products.length < 1 && <h4 className="error">Something went wrong</h4>
                }
            </Row>

        </Container>
    )
}

export default HomeProducts
