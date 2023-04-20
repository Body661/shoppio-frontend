import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductsByBrand} from "../../redux/actions/productActions";

const useProductsByBrand = (brandID) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    const getProduct = async () => {
        setLoading(true)
        await dispatch(getProductsByBrand('', 50, brandID))
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [])

    //when click pagination
    const handleChangePage = async (page) => {
        setLoading(true)
        await dispatch(getProductsByBrand(page, 50, brandID))
        setLoading(false)
    }

    const products = useSelector((state) => state.productReducer.productsByBrand)

    useEffect(() => {
        if (products && products?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [products, loading])


    return {items: products?.data?.data, pagination: products?.data?.pages, handleChangePage, loading, error}
}

export default useProductsByBrand