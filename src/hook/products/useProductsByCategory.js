import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductsByCategory} from "../../redux/actions/productActions";

const useProductsByCategory = (catID) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    const getProduct = async () => {
        setLoading(true)
        await dispatch(getProductsByCategory('', 50, catID))
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [])

    //when click pagination
    const onPress = async (page) => {
        await dispatch(getProductsByCategory(page, 50, catID))
    }

    const products = useSelector((state) => state.productReducer.productsByCategory)
    if (products?.status !== 200 && !loading) setError(true);

    let items = [];
    let pagination = [];

    if (products?.data?.data) items = products?.data?.data;
    if (products?.data?.paginationRes) pagination = products?.pages;

    return {items, pagination, onPress, loading, error}
}

export default useProductsByCategory