import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductsByCategory} from "../../redux/actions/productActions";

const ProductsByCategoryHook = (catID) => {

    let limit = 8;
    const dispatch = useDispatch();

    const getProduct = async () => {
        await dispatch(getProductsByCategory('', limit, catID))
    }
    useEffect(() => {
        getProduct()
    }, [])

    //when click pagination
    const onPress = async (page) => {
        await dispatch(getProductsByCategory(page, limit, catID))
    }

    const products = useSelector((state) => state.allProducts.productsByCategory)

    let items = [];
    let pagination = [];

    if (products?.data?.data) items = products?.data?.data;
    if (products?.data?.paginationRes) pagination = products?.pages;

    return [items, pagination, onPress]
}

export default ProductsByCategoryHook