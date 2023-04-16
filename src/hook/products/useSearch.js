import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProductsSearch} from '../../redux/actions/productActions'

const useSearch = () => {
    const [items, setItems] = useState(null)
    const [pagination, setPagination] = useState(0)
    const [results, setResults] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const getSearchParams = () => {
        const searchWord = sessionStorage.getItem('searchWord') || ''
        const catChecked = sessionStorage.getItem('catChecked') || ''
        const brandChecked = sessionStorage.getItem('brandChecked') || ''
        const priceTo = sessionStorage.getItem('priceTo') || ''
        const priceFrom = sessionStorage.getItem('priceFrom') || ''

        let priceFromString = ''
        let priceToString = ''

        if (priceFrom && priceFrom > 0) {
            priceFromString = `&price[gt]=${priceFrom}`
        }

        if (priceTo && priceTo > 0) {
            priceToString = `&price[lte]=${priceTo}`
        }

        return {
            searchWord,
            catChecked,
            brandChecked,
            priceFromString,
            priceToString
        }
    }

    const sortData = () => {
        const sortType = localStorage.getItem('sortType') || ''

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
    }

    const getProducts = async () => {
        setLoading(true)
        const {
            searchWord,
            catChecked,
            brandChecked,
            priceFromString,
            priceToString
        } = getSearchParams()

        const sort = sortData()

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=50&keyword=${searchWord}&${catChecked}&${brandChecked}${priceFromString}${priceToString}`))
        setLoading(false)
    }

    const onPress = async (page) => {
        setLoading(true)
        const {
            searchWord,
            catChecked,
            brandChecked,
            priceFromString,
            priceToString
        } = getSearchParams()

        const sort = sortData()

        await dispatch(getAllProductsSearch(`sort=${sort}&limit=50&page=${page}&keyword=${searchWord}&${catChecked}&${brandChecked}${priceFromString}${priceToString}`))
        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const allProducts = useSelector(state => state.productReducer.allProducts)

    useEffect(() => {
        if (allProducts?.data?.data) {
            setItems(allProducts.data.data)
        }
        if (allProducts?.data?.paginationRes) {
            setPagination(allProducts?.data?.paginationRes.pages)
        }
        if (allProducts?.data?.data?.results) {
            setResults(allProducts?.data?.results)
        }
    }, [allProducts])

    useEffect(() => {
        if (allProducts?.status !== 200 && !allProducts) {
            setError(true)
        } else {
            setError(false)
        }
    }, [allProducts, loading])

    return {items, pagination, onPress, getProducts, results, error, loading}
}

export default useSearch