import {useState} from 'react'
import ViewSearchProductsHook from './../products/searchProductsHook';

const NavbarSearchHook = () => {
    const [, , , getProduct] = ViewSearchProductsHook();

    const [searchWord, setSearchWord] = useState('')

    //when user type search word
    const OnChangeSearch = (e) => {
        sessionStorage.setItem("searchWord", e.target.value)
        setSearchWord(e.target.value)
    }

    const OnKeyPressSearch = (e) => {
        if (e.key === 'Enter') {
            const path = window.location.pathname;
            if (path !== "/products") {
                window.location.href = "/products"
            } else {
                getProduct();
            }
        }
    }

    return [OnKeyPressSearch, OnChangeSearch, searchWord]
}
export default NavbarSearchHook