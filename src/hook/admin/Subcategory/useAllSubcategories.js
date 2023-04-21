import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getSubcategories, getSubcategoriesOfCategory} from "../../../redux/actions/SubcategoryActions";

export const useAllSubcategories = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getSubcategories(page, searchTerm));
    }, [dispatch, searchTerm, page])

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() !== '') {
                setSearchTerm(`name=${e.target.value}`);
            } else {
                setSearchTerm("")
            }
        }
    }

    const handleChangePage = (page) => {
        setPage(page);
    }

    const handleSelectCategory = (e) => {
        if (e.target.value.trim() !== '') {
            dispatch(getSubcategoriesOfCategory(e.target.value.trim(), `page=${page}`, searchTerm));
        } else {
            dispatch(getSubcategories(`page=${page}`, searchTerm));
        }
    }

    const subcategories = useSelector(state => state.subcategoryReducer.subcategories)

    useEffect(() => {
        if (subcategories && subcategories?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [subcategories, loading])

    return {
        subcategories: subcategories?.data?.data,
        loading,
        error,
        pageCount: subcategories?.data?.paginationRes?.pages,
        handleChangePage,
        handleSearch,
        handleSelectCategory
    };
}