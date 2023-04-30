import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBrands, getAllBrandsPage} from '../../redux/actions/BrandActions';

export const useAllBrands = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        dispatch(getAllBrands(50, searchTerm));
    }, [dispatch, searchTerm]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value.trim() !== '') {
                setSearchTerm(`name=${e.target.value}`);
            } else {
                setSearchTerm("")
            }
        }
    }

    const brands = useSelector((state) => state.brandReducer.brands);
    const pageCount = brands?.data?.pagination?.pages || 0;

    useEffect(() => {
        if (brands && brands?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [brands, loading])

    const handleChangePage = (page) => {
        dispatch(getAllBrandsPage(page, searchTerm));
    };

    return {brands: brands?.data?.data, loading, error, pageCount, handleChangePage, handleSearch};
};