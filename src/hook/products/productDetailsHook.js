import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getOneProduct, getProductsByCategory} from '../../redux/actions/productActions';

const ViewProductsDetailsHook = (prodID) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneProduct(prodID))
    }, [])

    const product = useSelector((state) => state.allProducts.product)
    const productsByCategory = useSelector((state) => state.allProducts.productsByCategory)

    useEffect(() => {
        if (product?.data?.data?.category) dispatch(getProductsByCategory("", "", product?.data?.data?.category?._id))

    }, [product])

    //to view images gallery
    let images = []
    if (product?.data?.data?.images) images = product?.data?.data?.images?.push(product?.data?.data?.cover)
    if (product?.data?.data?.images) images = product?.data?.data?.images?.map((img) => ({original: img}))

    let products = []
    if (productsByCategory?.data?.data) products = productsByCategory?.data?.data;

    return [product?.data?.data, images, products]
}

export default ViewProductsDetailsHook