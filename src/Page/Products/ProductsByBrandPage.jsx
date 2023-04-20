import {Container, Col, Row} from 'react-bootstrap';
import Pagination from '../../Components/Utility/Pagination';
import CardProductsContainer from './../../Components/Products/ProductsContainer';
import {useParams} from 'react-router-dom';
import UseProductsByBrand from "../../hook/products/useProductsByBrand";

const ProductsByBrandPage = () => {
    const {id} = useParams()
    const {items, pagination, handleChangePage, loading} = UseProductsByBrand(id)
    
    return (
        <div style={{minHeight: "80vh"}}>

            <Container>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <CardProductsContainer products={items} loading={loading}/>
                    </Col>
                </Row>

                {pagination > 1 && <Pagination pageCount={pagination} handleChangePage={handleChangePage}/>}
            </Container>
        </div>
    )
}

export default ProductsByBrandPage
