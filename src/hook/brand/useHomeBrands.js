import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBrands, getAllBrandsPage} from '../../redux/actions/BrandActions';

export const useHomeBrands = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(getAllBrands(6));
    }, [dispatch]);

    const brands = useSelector((state) => state.allBrands.brands);

    useEffect(() => {
        if (brands?.status !== 200 && !loading) {
            setError(true)
        } else {
            setError(false)
        }
        setLoading(false);
    }, [brands, loading])

    return {brands: brands?.data?.data, loading, error};
};