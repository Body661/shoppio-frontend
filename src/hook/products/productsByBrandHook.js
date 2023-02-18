import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductsByBrand} from "../../redux/actions/productActions";

const ProductsByBrandHook = (brandID) => {
    let limit = 8;
    const dispatch = useDispatch();

    const getProduct = async () => {
        await dispatch(getProductsByBrand('', limit, brandID))
    }

    useEffect(() => {
        getProduct()
    }, [])

    //when click pagination
    const onPress = async (page) => {
        await dispatch(getProductsByBrand(page, limit, brandID))
    }

    const products = useSelector((state) => state.allProducts.productsByBrand)

    let items = [];
    let pagination = [];

    if (products.data) items = products?.data;
    if (products?.paginationRes) pagination = products?.pages;


    return [items, pagination, onPress]
}

export default ProductsByBrandHook