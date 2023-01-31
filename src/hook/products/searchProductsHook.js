import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from '../../redux/actions/ProductActions';
import {getAllProductsPage} from '../../redux/actions/ProductActions';

const ViewSearchProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts(12))
    }, [])

    const allProducts = useSelector((state) => state.allProducts.allProducts)

    let items = [];
    if (allProducts.data) items = allProducts.data;

    let pagination = [];
    if (allProducts.paginationRes) pagination = allProducts.paginationRes.pages;

    const onPress = async (page) => {
        await dispatch(getAllProductsPage(page, 12))
    }

    return [items, pagination, onPress]

}

export default ViewSearchProductsHook