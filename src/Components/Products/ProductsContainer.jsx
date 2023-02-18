import {Container, Row} from 'react-bootstrap'
import SubTitle from '../Uitily/SubTitle'
import ProductCard from './ProductCard'

const ProductsContainer = ({title, btnTitle, pathText, products}) => {
    return (
        <Container>
            {products ? (<SubTitle title={title} btntitle={btnTitle} pathText={pathText}/>) : null}
            <Row className='my-2 d-flex '>
                {
                    products?.length > 0 || products ? (
                        products?.map((item, index) => <ProductCard key={index} item={item}/>)
                    ) : <p>No products found</p>
                }

            </Row>
        </Container>
    )
}

export default ProductsContainer