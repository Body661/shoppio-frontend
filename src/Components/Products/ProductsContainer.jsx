import {Col, Container, Row} from 'react-bootstrap'
import SectionTitle from '../Utility/SectionTitle'
import HomeProductCard from './HomeProductCard'
import useProductsContainer from "../../hook/products/useProductsContainer";
import {Backdrop, CircularProgress} from "@mui/material";

const ProductsContainer = ({
                               title,
                               btnTitle,
                               pathText,
                               products,
                               loading,
                               error,
                               xSmall = 8,
                               small = 6,
                               medium = 4,
                               large = 3
                           }) => {
    let content = null;
    const {isFavProduct} = useProductsContainer()

    if (!loading && !error && products && products?.length > 0) {
        content = products?.map((product) => (
            <Col xs={xSmall} sm={small} md={medium} lg={large} key={product?._id}>
                <HomeProductCard product={product} isFavProduct={isFavProduct}/>
            </Col>
        ))

    } else if (!loading && !error && (products && products?.length <= 0)) {
        content = <h4 className="notFound">No products found</h4>;

    } else if (!loading && error && !products) {
        content = <h4 className="error">Something went wrong</h4>;
    }

    return (
        <Container>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            {title ? (<SectionTitle title={title} btntitle={btnTitle} pathText={pathText}/>) : null}
            <Row className="d-flex justify-content-center">
                {content}
            </Row>
        </Container>
    )
}

export default ProductsContainer