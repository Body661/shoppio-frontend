import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProductsSearch} from '../../redux/actions/productActions'
import {updateSearchParams} from "../../redux/actions/searchActions";

const useSearch = () => {
    const [items, setItems] = useState(null);
    const [pagination, setPagination] = useState(0);
    const [results, setResults] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const searchParams = useSelector((state) => state.searchReducer.searchParams);
    const dispatch = useDispatch();


    const handleChangePriceFrom = (e) =>
        dispatch(updateSearchParams({ priceFrom: e.target.value }));
    const handleChangePriceTo = (e) =>
        dispatch(updateSearchParams({ priceTo: e.target.value }));
    const handleSearchWord = (e) =>
        dispatch(updateSearchParams({ searchWord: e.target.value }));
    const handleCheckCategory = (categories) =>
        dispatch(updateSearchParams({ checkedCategory: categories }));
    const handleCheckBrand = (brands) =>
        dispatch(updateSearchParams({ checkedBrand: brands }));
    const handleSetSortType = (type) =>
        dispatch(updateSearchParams({ sortType: type }));

    const getSearchParams = () => {
        let priceFromString = '';
        let priceToString = '';

        if (searchParams.priceFrom && +searchParams.priceFrom > 0) {
            priceFromString = `&price[gt]=${searchParams.priceFrom}`;
        }

        if (searchParams.priceTo && +searchParams.priceTo > 0) {
            priceToString = `&price[lte]=${searchParams.priceTo}`;
        }

        return {
            searchWord: searchParams.searchWord,
            checkedCategory: searchParams.checkedCategory,
            checkedBrand: searchParams.checkedBrand,
            priceFromString,
            priceToString,
            priceFrom: searchParams.priceFrom,
            priceTo: searchParams.priceTo
        }
    };

    const sortData = () => {
        if (searchParams.sortType === 'Price from low to high') {
            return '+price'
        } else if (searchParams.sortType === 'Price from high to low') {
            return '-price'
        } else if (searchParams.sortType === 'Best seller') {
            return '-sold'
        } else if (searchParams.sortType === 'Most rated') {
            return '-ratingsQuantity'
        } else {
            return ''
        }
    };

    const getProducts = async () => {
        setLoading(true);
        const {
            priceFromString,
            priceToString
        } = getSearchParams()

        const sort = sortData()

        const categories = searchParams.checkedCategory.map(val => 'category=' + val).join('&');
        const brands = searchParams.checkedBrand.map(val => 'brand=' + val).join('&');

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=50&keyword=${searchParams.searchWord}&${categories}&${brands}${priceFromString}${priceToString}`))
        setLoading(false)
    }

    const handleChangePage = async (page) => {
        setLoading(true);
        const {
            priceFromString,
            priceToString
        } = getSearchParams()

        const sort = sortData();

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=50&page=${page}&keyword=${searchParams.searchWord}&${searchParams.checkedCategory}&${searchParams.checkedBrand}${priceFromString}${priceToString}`))
        setLoading(false)
    }

    useEffect(() => {
        setTimeout(async () => {
            await getProducts();
        }, 1000);
    }, [
        searchParams.searchWord,
        searchParams.priceFrom,
        searchParams.priceTo,
        searchParams.sortType,
    ]);

    const products = useSelector(state => state.productReducer.allProducts)

    useEffect(() => {
        if (products?.data?.data) {
            setItems(products.data.data)
        }
        if (products?.data?.pagination) {
            setPagination(products?.data?.pagination.pages)
        }
        if (products?.data?.data?.results) {
            setResults(products?.data?.results)
        }
    }, [products])

    useEffect(() => {
        if (products?.status !== 200 && !products) {
            setError(true)
        } else {
            setError(false)
        }
    }, [products, loading])

    return {
        items,
        pagination,
        handleChangePage,
        getProducts,
        results,
        error,
        loading,
        handleSearchWord,
        handleCheckCategory,
        handleChangePriceTo,
        handleChangePriceFrom,
        handleCheckBrand,
        getSearchParams,
        handleSetSortType
    }
}

export default useSearch