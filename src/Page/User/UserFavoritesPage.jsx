import {Col, Container, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import useProductsContainer from "../../hook/products/useProductsContainer";
import {getWishlist} from "../../redux/actions/wishlistActions";
import HomeProductCard from "../../Components/Products/HomeProductCard";
import {Backdrop, CircularProgress} from "@mui/material";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import {Favorite, ShoppingCart} from "@mui/icons-material";

const UserFavoritesPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const {favProd} = useProductsContainer()

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getWishlist())
            setLoading(false)
        }
        get()
    }, [])

    const res = useSelector(state => state.wishlistReducer.allWishList)

    useEffect(() => {
        if (loading === false) {
            if (res) setItems(res?.data?.data)
        }
    }, [loading])

    return (
        <Container style={{minHeight: "80vh"}}>
            <Row>
                <div className="page-header mt-4">
                    <Favorite style={{fontSize: "45px"}}/>
                    <span className="page-header-text"> Favorites </span>
                </div>
            </Row>

            <Row className='justify-content-start mt-4'>
                <ProductsContainer products={items} loading={loading}/>
                {items?.length <= 0 && !loading && <h6>No items in your wishlist</h6>}
            </Row>
        </Container>
    )
}

export default UserFavoritesPage
