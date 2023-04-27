import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProductsSearch} from '../../redux/actions/productActions'

const useSearch = () => {
    const [items, setItems] = useState(null);
    const [pagination, setPagination] = useState(0);
    const [results, setResults] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [searchWord, setSearchWord] = useState('');
    const [checkedCategory, setCategory] = useState([]);
    const [checkedBrand, setBrand] = useState([]);
    const [sortType, setSortType] = useState('');
    const dispatch = useDispatch();

    const handleChangePriceFrom = (e) => setPriceFrom(e.target.value);
    const handleChangePriceTo = (e) => setPriceTo(e.target.value);
    const handleSearchWord = (e) => setSearchWord(e.target.value);
    const handleCheckCategory = (categories) => setCategory(categories);
    const handleCheckBrand = (brands) => setBrand(brands);
    const handleSetSortType = (type) => setSortType(type);

    const getSearchParams = () => {
        let priceFromString = '';
        let priceToString = '';

        if (priceFrom && +priceFrom > 0) {
            priceFromString = `&price[gt]=${priceFrom}`;
        }

        if (priceTo && +priceTo > 0) {
            priceToString = `&price[lte]=${priceTo}`;
        }

        return {
            searchWord,
            checkedCategory,
            checkedBrand,
            priceFromString,
            priceToString,
            priceFrom,
            priceTo
        }
    };

    const sortData = () => {
        if (sortType === 'Price from low to high') {
            return '+price'
        } else if (sortType === 'Price from high to low') {
            return '-price'
        } else if (sortType === 'Best seller') {
            return '-sold'
        } else if (sortType === 'Most rated') {
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

        const categories = checkedCategory.map(val => 'category=' + val).join('&');
        const brands = checkedBrand.map(val => 'brand=' + val).join('&');

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=50&keyword=${searchWord}&${categories}&${brands}${priceFromString}${priceToString}`))
        setLoading(false)
    }

    const handleChangePage = async (page) => {
        setLoading(true);
        const {
            priceFromString,
            priceToString
        } = getSearchParams()

        const sort = sortData();

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=50&page=${page}&keyword=${searchWord}&${checkedCategory}&${checkedBrand}${priceFromString}${priceToString}`))
        setLoading(false)
    }

    useEffect(() => {
        setTimeout(async () => {
            await getProducts()
        }, 1000)
    }, [searchWord, priceFrom, priceTo, sortType])

    const products = useSelector(state => state.productReducer.allProducts)

    useEffect(() => {
        if (products?.data?.data) {
            setItems(products.data.data)
        }
        if (products?.data?.paginationRes) {
            setPagination(products?.data?.paginationRes.pages)
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