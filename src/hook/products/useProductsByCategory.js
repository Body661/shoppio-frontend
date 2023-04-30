import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductsByCategory} from "../../redux/actions/productActions";

const useProductsByCategory = (categoryId) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    const getProduct = async () => {
        setLoading(true)
        await dispatch(getProductsByCategory('', 50, categoryId))
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [])

    //when click pagination
    const handleChangePage = async (page) => {
        await dispatch(getProductsByCategory(page, 50, categoryId))
    }

    const products = useSelector((state) => state.productReducer.productsByCategory)

    useEffect(() => {
        if (products && products?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [products, loading])

    return {items: products?.data?.data, pagination: products?.data?.pagination?.pages, handleChangePage, loading, error}
}

export default useProductsByCategory