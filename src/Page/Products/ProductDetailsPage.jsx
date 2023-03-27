import React from 'react'
import {Container} from 'react-bootstrap'
import CategoryHeader from '../../Components/Category/CategoryHeader'
import ProductDetails from '../../Components/Products/ProductDetails'
import ReviewsContainer from '../../Components/Products/Review/ReviewsContainer'
import {useParams} from "react-router-dom";
import useProductDetails from "../../hook/products/useProductDetails";
import ProductsContainer from "../../Components/Products/ProductsContainer";

const ProductDetailsPage = () => {
    const {id} = useParams();
    const {item, products} = useProductDetails(id);

    let rateAvg;
    let rateQty;

    if (item) {
        rateAvg = item.ratingsAvg
        rateQty = item.ratingsQuantity
    }

    return (
        <div style={{minHeight: '670px'}}>
            <CategoryHeader/>
            <Container>
                <ProductDetails/>
                <ReviewsContainer rateAvg={rateAvg} rateQty={rateQty}/>
                <ProductsContainer products={products} title="Products you may like"/>
            </Container>
        </div>
    )
}

export default ProductDetailsPage
