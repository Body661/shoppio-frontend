import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getOneProduct, getProductsByCategory} from '../../redux/actions/productActions';

const useProductDetails = (prodID) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(false)
            await dispatch(getOneProduct(prodID))
            setLoading(false);
        }

        fetchProduct()
    }, [prodID])

    const product = useSelector((state) => state.productReducer.product)

    useEffect(() => {
        if (product?.data?.data?.category) dispatch(getProductsByCategory(1, 4, product?.data?.data?.category?._id))
    }, [product])

    const productsByCategory = useSelector((state) => state.productReducer.productsByCategory)

    useEffect(() => {
        if (product?.status !== 200 && !loading) setError(true);
    }, [product, loading]);

    //to view images gallery
    let images = []
    if (product?.data?.data?.images) images = product?.data?.data?.images?.map((img) => ({original: img}))

    let products = []
    if (productsByCategory?.data?.data) products = productsByCategory?.data?.data;

    return {product: product?.data?.data, images, products, loading, error}
}

export default useProductDetails