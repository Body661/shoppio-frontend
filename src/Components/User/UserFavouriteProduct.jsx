import React, {useState, useEffect} from 'react'
import {Row, Spinner} from 'react-bootstrap';
import Pagination from '../Utility/Pagination'
import {getWishlist} from "../../redux/actions/wishlistActions";
import {useDispatch, useSelector} from "react-redux";
import useProductsContainer from "../../hook/products/useProductsContainer";
import ProductCard from "../Products/ProductCard";

const UserFavouriteProduct = () => {

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
        <div>
            <div className="admin-content-text pb-4">Favorites</div>
            <Row className='justify-content-start'>
                {items?.length > 0 && !loading && items?.map((item, index) => (
                    <ProductCard key={index} item={item} favProd={favProd}/>))}
                {items?.length <= 0 && !loading && <h6>No items in your wishlist</h6>}
                {items?.length <= 0 && loading && <Spinner animation={"border"} variant={"primary"}/>}
            </Row>
        </div>
    )
}

export default UserFavouriteProduct
