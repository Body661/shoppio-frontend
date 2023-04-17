import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useSearch from '../useSearch';
import {getAllCategories} from '../../../redux/actions/CategoryActions';
import {getAllBrands} from '../../../redux/actions/BrandActions';

const useSidebarSearch = () => {
    const {
        handleCheckCategory,
        handleCheckBrand,
        getSearchParams,
        getProducts
    } = useSearch();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const {
        checkedCategory,
        checkedBrand,
        priceToString,
        priceFromString
    } = getSearchParams()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
            setLoading(false)
        };
        fetchData();
    }, []);

    const allCategories = useSelector(state => state.categoryReducer.categories);
    const allBrands = useSelector(state => state.brandReducer.brands);

    const category = allCategories?.data?.data || [];
    const brand = allBrands?.data?.data || [];

    const fetchProducts = () => {
        setTimeout(async () => {
            setLoading(true)
            await getProducts();
            setLoading(false)
        }, 1000);
    };

    const handleClickCategory = e => {
        const value = e.target.value;
        if (!value || value.trim() === '') {
            handleCheckCategory([]);
        } else {
            if (e.target.checked) {
                handleCheckCategory([...checkedCategory, value]);
            } else {
                const newArray = checkedCategory.filter(item => item !== value);
                handleCheckCategory(newArray);
            }
        }
    };

    const handleClickBrand = e => {
        const value = e.target.value;
        if (value === '0') {
            handleCheckBrand([]);
        } else {
            if (e.target.checked) {
                handleCheckBrand([...checkedBrand, value]);
            } else {
                const newArray = checkedBrand.filter(item => item !== value);
                handleCheckBrand(newArray);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [checkedCategory, checkedBrand, priceFromString, priceToString]);

    return {
        category,
        brand,
        handleClickCategory,
        handleClickBrand,
        loading
    };
};

export default useSidebarSearch;
