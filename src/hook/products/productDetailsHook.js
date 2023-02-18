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
        if (product?.data?.category) dispatch(getProductsByCategory("", "", product?.data?.category?._id))

    }, [product])

    //to view images gallery
    let images = []
    if (product?.data?.images) images = product.data.images.push(product.data.cover)
    if (product?.data?.images) images = product?.data?.images?.map((img) => ({original: img}))

    let products = []
    if (productsByCategory) products = productsByCategory?.data;

    return [product.data, images, products]
}

export default ViewProductsDetailsHook