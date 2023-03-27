import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useSearch from '../useSearch';
import {getAllCategories} from '../../../redux/actions/CategoryActions';
import {getAllBrands} from '../../../redux/actions/BrandActions';

const useSidebarSearch = () => {
    const {getProduct} = useSearch();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
        };
        fetchData();
    }, []);

    const allCategories = useSelector(state => state.allCategories.categories);
    const allBrands = useSelector(state => state.allBrands.brands);

    const category = allCategories?.data?.data || [];
    const brand = allBrands?.data?.data || [];

    const [catChecked, setCatChecked] = useState([]);
    const [brandChecked, setBrandChecked] = useState([]);
    const [from, setPriceFrom] = useState(0);
    const [to, setToFrom] = useState(0);

    const updateProduct = () => {
        setTimeout(() => {
            getProduct();
        }, 1000);
    };

    const handleClickCategory = e => {
        const value = e.target.value;
        if (!value || value.trim() === '') {
            setCatChecked([]);
        } else {
            if (e.target.checked) {
                setCatChecked([...catChecked, value]);
            } else {
                const newArray = catChecked.filter(item => item !== value);
                setCatChecked(newArray);
            }
        }
    };

    useEffect(() => {
        const queryCat = catChecked.map(val => 'category=' + val).join('&');
        sessionStorage.setItem('catChecked', queryCat);
        updateProduct();
    }, [catChecked]);

    const handleClickBrand = e => {
        const value = e.target.value;
        if (value === '0') {
            setBrandChecked([]);
        } else {
            if (e.target.checked) {
                setBrandChecked([...brandChecked, value]);
            } else {
                const newArray = brandChecked.filter(item => item !== value);
                setBrandChecked(newArray);
            }
        }
    };

    useEffect(() => {
        const queryBrand = brandChecked.map(val => 'brand=' + val).join('&');
        sessionStorage.setItem('brandChecked', queryBrand);
        updateProduct();
    }, [brandChecked]);

    const handlePriceFrom = e => {
        const value = e.target.value;
        sessionStorage.setItem('priceFrom', value);
        setPriceFrom(value);
    };

    const handlePriceTo = e => {
        const value = e.target.value;
        sessionStorage.setItem('priceTo', value);
        setToFrom(value);
    };

    useEffect(() => {
        updateProduct();
    }, [from, to]);

    return {
        category,
        brand,
        handleClickCategory,
        handleClickBrand,
        handlePriceFrom,
        handlePriceTo,
    };
};

export default useSidebarSearch;
