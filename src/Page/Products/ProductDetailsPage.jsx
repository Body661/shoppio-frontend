import React, {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import ProductDetails from '../../Components/Products/ProductDetails'
import ReviewsContainer from '../../Components/Products/Review/ReviewsContainer'
import {useParams} from "react-router-dom";
import useProductDetails from "../../hook/products/useProductDetails";
import ProductsContainer from "../../Components/Products/ProductsContainer";

const ProductDetailsPage = () => {
    const {id} = useParams();
    const {product, products, images} = useProductDetails(id);


    useEffect(() => {

    }, [])

    let reviewsAmount;

    if (product) {
        reviewsAmount = product?.ratingsQuantity
    }

    return (
        <div style={{minHeight: '80vh'}}>
            <Container>
                <ProductDetails product={product} images={images}/>
                <ReviewsContainer reviewsAmount={reviewsAmount}/>
                <ProductsContainer products={products} title="Products you may like"/>
            </Container>
        </div>
    )
}

export default ProductDetailsPage
