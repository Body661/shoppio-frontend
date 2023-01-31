import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts, getProductsByCategory} from '../../redux/actions/ProductActions';

const ViewHomeProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts(4))
        dispatch(getProductsByCategory('63a73190f03c4a488cc4b6d9'))
    }, [])

    const allProducts = useSelector((state) => state.allProducts.allProducts)
    const allProductsByCategory = useSelector(state => state.allProducts.productsByCategory)
    const loading = useSelector((state) => state.allProducts.loading)
    const error = useSelector((state) => state.allProducts.error)

    let products = [];
    if (allProducts?.data && allProducts?.data.length > 0) products = allProducts?.data;

    let categoryProducts = [];
    if (allProductsByCategory?.data && allProductsByCategory?.data.length > 0) categoryProducts = allProductsByCategory?.data;

    return [products, categoryProducts, loading, error]
}

export default ViewHomeProductsHook