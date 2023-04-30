import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllCategories, getAllCategoriesPage} from "../../redux/actions/CategoryActions";

export const useAllCategories = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        dispatch(getAllCategories(50, searchTerm));
    }, [dispatch, searchTerm])

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() !== '') {
                setSearchTerm(`name=${e.target.value}`);
            } else {
                setSearchTerm("")
            }
        }
    }

    const categories = useSelector(state => state.categoryReducer.categories)
    let pageCount = categories?.data?.pagination?.pages || 0;

    useEffect(() => {
        if (categories && categories?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [categories, loading])

    const handleChangePage = (page) => {
        dispatch(getAllCategoriesPage(page, searchTerm));
    }

    return {categories: categories?.data?.data, loading, error, pageCount, handleChangePage, handleSearch};
}