import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from '../../../redux/actions/productActions';
import {getAllProductsPage} from '../../../redux/actions/productActions';

const useAdminGetProducts = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() !== '') {
                setSearchTerm(`keyword=${e.target.value}`)
            } else {
                setSearchTerm("")
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllProducts(50, searchTerm))
            setLoading(false)
        }

        fetchData()
    }, [searchTerm])

    const handleChangePage = async (page) => {
        setLoading(true)
        await dispatch(getAllProductsPage(page, 50, searchTerm))
        setLoading(false)
    }

    const allProducts = useSelector((state) => state.productReducer.allProducts)

    useEffect(() => {
        if (!loading && allProducts && allProducts?.status !== 200) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [allProducts, loading])

    return {
        products: allProducts?.data?.data,
        pagination: allProducts?.data.paginationRes?.pages,
        handleChangePage,
        loading,
        error,
        handleSearch
    }
}

export default useAdminGetProducts