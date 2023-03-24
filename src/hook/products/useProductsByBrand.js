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
    const onPress = async (page) => {
        setLoading(true)
        await dispatch(getProductsByBrand(page, 50, brandID))
        setLoading(false)
    }

    const products = useSelector((state) => state.allProducts.productsByBrand)

    if (products?.status !== 200 && !loading) setError(true);

    let items = [];
    let pagination = [];

    if (products?.data?.data) items = products?.data?.data;
    if (products?.data?.paginationRes) pagination = products?.data?.pages;


    return {items, pagination, onPress, loading, error}
}

export default useProductsByBrand