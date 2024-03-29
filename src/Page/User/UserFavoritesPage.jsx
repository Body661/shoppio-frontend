import {Container, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getWishlist} from "../../redux/actions/wishlistActions";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import {Favorite} from "@mui/icons-material";

const UserFavoritesPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getWishlist())
            setLoading(false)
        }
        get()
    }, [dispatch])

    const res = useSelector(state => state.wishlistReducer.allWishList)

    useEffect(() => {
        if (loading === false) {
            if (res) setItems(res?.data?.data)
        }
    }, [loading, res])

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
            </Row>
        </Container>
    )
}

export default UserFavoritesPage
