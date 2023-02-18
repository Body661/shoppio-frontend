import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from '../../redux/actions/productActions';
import {getAllProductsPage} from '../../redux/actions/productActions';

const ViewProductAdminHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts(8))
    }, [])


    const onPress = async (page) => {
        await dispatch(getAllProductsPage(page, 8))
    }
    let items = [];
    let pagination = [];
    const allProducts = useSelector((state) => state.allProducts.allProducts)
    const loading = useSelector((state) => state.allProducts.loading)
    const error = useSelector((state) => state.allProducts.error)

    if (allProducts?.data) items = allProducts?.data;
    if (allProducts?.paginationRes) pagination = allProducts?.paginationRes?.pages;

    return [items, pagination, onPress, loading, error]

}

export default ViewProductAdminHook