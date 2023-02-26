import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getAllBrands, getAllBrandsPage} from '../../redux/actions/BrandActions'

export const AllBrandsHook = () => {
    const dispatch = useDispatch();
    //when first load
    useEffect(() => {
        dispatch(getAllBrands(4));
    }, [])

    //to get state from redux
    const brands = useSelector(state => state.allBrands.brands)
    const loading = useSelector(state => state.allBrands.loading)
    const error = useSelector(state => state.allBrands.error)


    //to get page count
    let pageCount = 0;
    if (brands?.data?.paginationRes) pageCount = brands?.data?.paginationRes?.pages

    //when press pagination
    const getPage = (page) => {
        dispatch(getAllBrandsPage(page));
    }

    return [brands, loading, pageCount, getPage, error]
};