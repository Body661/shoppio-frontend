import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsSearch} from '../../redux/actions/productActions';

const ViewSearchProductsHook = () => {
    let limit = 8;
    let items = [];
    let pagination = 0;
    let results = 0;
    const dispatch = useDispatch();
    let word = "", queryCat = "", brandCat = "", priceTo = "", priceFrom = "";
    let sortType = "", sort;

    const getStorage = () => {
        if (sessionStorage.getItem("searchWord") != null) word = sessionStorage.getItem("searchWord")
        if (sessionStorage.getItem("catChecked") != null) queryCat = sessionStorage.getItem("catChecked")
        if (sessionStorage.getItem("brandChecked") != null) brandCat = sessionStorage.getItem("brandChecked")
        if (sessionStorage.getItem("priceTo") != null) priceTo = sessionStorage.getItem("priceTo")
        if (sessionStorage.getItem("priceFrom") != null) priceFrom = sessionStorage.getItem("priceFrom")

        if (priceFrom === "" || priceFrom <= 0) {
            priceFromString = ""
        } else {
            priceFromString = `&price[gt]=${priceFrom}`
        }

        if (priceTo === "" || priceTo <= 0) {
            priceToString = ""
        } else {
            priceToString = `&price[lte]=${priceTo}`
        }
    }

    const getProduct = async () => {
        getStorage();
        sortData();

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&keyword=${word}&${queryCat}&${brandCat}${priceFromString}${priceToString}`))
    }
    useEffect(() => {
        getProduct()
    }, [])

    const allProducts = useSelector((state) => state.allProducts.allProducts)


    if (allProducts?.data) items = allProducts?.data;
    if (allProducts?.paginationRes) pagination = allProducts.paginationRes.pages;
    if (allProducts?.results) results = allProducts?.results;

    let priceFromString = "", priceToString = ""

    //when click pagination
    const onPress = async (page) => {
        getStorage();
        sortData();
        await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${brandCat}${priceFromString}${priceToString}`))
    }

    ///when user choose sort type
    const sortData = () => {
        if (localStorage.getItem("sortType") !== null) sortType = localStorage.getItem("sortType")

        if (sortType === "Price from low to high")
            sort = "+price"
        else if (sortType === "Price from high to low")
            sort = "-price"
        else if (sortType === "")
            sort = ""
        else if (sortType === "Best seller")
            sort = "-sold"
        else if (sortType === "Most rated")
            sort = "-ratingsQuantity"
    }


    return [items, pagination, onPress, getProduct, results]

}

export default ViewSearchProductsHook