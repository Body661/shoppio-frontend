import { useState } from 'react';
import useSearch from '../useSearch';

const useNavbarSearch = () => {
    const { getProduct } = useSearch();
    const [searchWord, setSearchWord] = useState('');

    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;
        sessionStorage.setItem('searchWord', searchValue);
        setSearchWord(searchValue);
    };

    const handleKeyPressSearch = (e) => {
        if (e.key === 'Enter') {
            const path = window.location.pathname;
            if (path !== '/products') {
                window.location.href = '/products';
            } else {
                getProduct();
            }
        }
    };

    return { handleKeyPressSearch, handleChangeSearch, searchWord };
};

export default useNavbarSearch;