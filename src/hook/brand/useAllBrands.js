import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBrands, getAllBrandsPage} from '../../redux/actions/BrandActions';

export const useAllBrands = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(getAllBrands(50));
    }, [dispatch]);

    const brands = useSelector((state) => state.allBrands.brands);
    const pageCount = brands?.data?.paginationRes?.pages || 0;

    useEffect(() => {
        if (brands && brands?.status !== 200) setError(true)
        setLoading(false);
    }, [brands])

    const getPage = (page) => {
        dispatch(getAllBrandsPage(page));
    };

    return {brands: brands?.data?.data, loading, error, pageCount, getPage};
};