import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts, getProductsByCategoryHome} from '../../redux/actions/productActions';

const useHomeProducts = () => {
    const [loadingAllProducts, setLoadingAllProducts] = useState(true);
    const [errorAllProducts, setErrorAllProducts] = useState(false);
    const [loadingCatProducts, setLoadingCatProducts] = useState(true);
    const [errorCatProducts, setErrorCatProducts] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            setLoadingAllProducts(true)
            // setLoadingCatProducts(true)
            await dispatch(getAllProducts(10));
            // await dispatch(getProductsByCategoryHome('63a73190f03c4a488cc4b6d9'));
        }

        fetchData();

    }, [])

    const allProducts = useSelector((state) => state.productReducer.allProducts)
    // const allProductsByCategory = useSelector(state => state.productReducer.productsByCategoryHome)

    useEffect(() => {
        if (allProducts && allProducts?.status !== 200 && !loadingAllProducts) {
            setErrorAllProducts(true)
        } else {
            setErrorAllProducts(false)
        }
        setLoadingAllProducts(false);
    }, [allProducts, loadingAllProducts])


    // useEffect(() => {
    //     if (allProductsByCategory && allProductsByCategory?.status !== 200 && !loadingCatProducts) {
    //         setErrorCatProducts(true)
    //     } else {
    //         setErrorCatProducts(false)
    //     }
    //     setLoadingCatProducts(false);
    // }, [allProductsByCategory, loadingCatProducts])


    return {
        bestSeller: allProducts?.data?.data,
        // categoryProducts: allProductsByCategory?.data?.data,
        loadingAllProducts,
        errorAllProducts,
        loadingCatProducts,
        errorCatProducts
    }
}

export default useHomeProducts