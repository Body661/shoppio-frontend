import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from '../../redux/actions/productActions';
import {getAllProductsPage} from '../../redux/actions/productActions';

const useAdminGetProducts = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        dispatch(getAllProducts(8))
        setLoading(false)
    }, [])


    const onPress = async (page) => {
        setLoading(true)
        await dispatch(getAllProductsPage(page, 8))
        setLoading(false)
    }

    let items = [];
    let pagination = [];
    const allProducts = useSelector((state) => state.allProducts.allProducts)

    if(allProducts?.status !== 200) setError(true)

    if (allProducts?.data?.data) items = allProducts?.data;
    if (allProducts?.data?.paginationRes) pagination = allProducts?.data.paginationRes?.pages;

    return {items, pagination, onPress, loading, error}

}

export default useAdminGetProducts