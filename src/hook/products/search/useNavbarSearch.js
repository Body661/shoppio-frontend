import { useState } from 'react';
import useSearch from '../useSearch';

const useNavbarSearch = () => {
    const { getProducts } = useSearch();
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
                getProducts();
            }
        }
    };

    return { handleKeyPressSearch, handleChangeSearch, searchWord };
};

export default useNavbarSearch;