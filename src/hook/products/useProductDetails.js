import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getOneProduct, getProductsByCategory} from '../../redux/actions/productActions';

const useProductDetails = (prodID) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneProduct(prodID))
    }, [prodID])

    const product = useSelector((state) => state.productReducer.product)

    useEffect(() => {
        if (product?.data?.data?.category) dispatch(getProductsByCategory("", "", product?.data?.data?.category?._id))
    }, [product])

    const productsByCategory = useSelector((state) => state.productReducer.productsByCategory)

    //to view images gallery
    let images = []
    if (product?.data?.data?.images) images = product?.data?.data?.images?.map((img) => ({original: img}))

    let products = []
    if (productsByCategory?.data?.data) products = productsByCategory?.data?.data;

    return {product: product?.data?.data, images, products}
}

export default useProductDetails