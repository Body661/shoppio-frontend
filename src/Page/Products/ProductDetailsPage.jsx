import {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import ProductDetails from '../../Components/Products/ProductDetails'
import ReviewsContainer from '../../Components/Products/Review/ReviewsContainer'
import {useParams} from "react-router-dom";
import useProductDetails from "../../hook/products/useProductDetails";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import {Backdrop, CircularProgress} from "@mui/material";

const ProductDetailsPage = () => {
    const {id} = useParams();
    const {product, products, images, loading} = useProductDetails(id);

    let reviewsAmount;
    if (product) {
        reviewsAmount = product?.ratingsQuantity
    }

    return (
        <div style={{minHeight: '80vh'}}>
            <Container>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>

                <ProductDetails product={product} images={images}/>
                <ReviewsContainer reviewsAmount={reviewsAmount}/>
                <ProductsContainer products={products} title="Products you may like"/>
            </Container>
        </div>
    )
}

export default ProductDetailsPage
