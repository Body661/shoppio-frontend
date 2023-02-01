import {useEffect, useState} from "react";
import ViewSearchProductsHook from "../products/searchProductsHook";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../redux/actions/CategoryAction";
import {getAllBrands} from "../../redux/actions/BrandActions";

const SidebarSearchHook = () => {
    const [, , , getProduct] = ViewSearchProductsHook();
    const dispatch = useDispatch();
    //when first load
    useEffect(() => {
        const get = async () => {
            await dispatch(getAllCategories());
            await dispatch(getAllBrands());
        }
        get();
    }, [])

    //to get state from redux
    const allCategories = useSelector(state => state.allCategories.categories)
    //to get state from redux
    const allBrands = useSelector(state => state.allBrands.brands)

    //to get category
    let category = [];
    if (allCategories.data)
        category = allCategories.data

    //to get category
    let brand = [];
    if (allBrands.data) brand = allBrands.data

    let queryCat = "", queryBrand = "";

    const [catChecked, setCatChecked] = useState([])
    //when user press any category
    const clickCategory = (e) => {
        let value = e.target.value
        if (value.trim() === "" || !value) {
            setCatChecked([])
        } else {
            if (e.target.checked === true) {
                setCatChecked([...catChecked, value])
            } else if (e.target.checked === false) {
                const newArray = catChecked.filter((e) => e !== value)
                setCatChecked(newArray)
            }
        }

    }
    useEffect(() => {
        queryCat = catChecked.map(val => "category=" + val).join("&")

        sessionStorage.setItem("catChecked", queryCat)
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [catChecked])


    const [brandChecked, setBrandChecked] = useState([])
    //when user press any category
    const clickBrand = (e) => {
        let value = e.target.value
        if (value === "0") {
            setBrandChecked([])
        } else {
            if (e.target.checked === true) {
                setBrandChecked([...brandChecked, value])
            } else if (e.target.checked === false) {
                const newArray = brandChecked.filter((e) => e !== value)
                setBrandChecked(newArray)
            }
        }
    }

    useEffect(() => {
        queryBrand = brandChecked.map(val => "brand=" + val).join("&")
        sessionStorage.setItem("brandChecked", queryBrand)
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [brandChecked])

    const [From, setPriceFrom] = useState(0)
    const [To, setToFrom] = useState(0)

    const priceFrom = (e) => {
        sessionStorage.setItem("priceFrom", e.target.value)

        setPriceFrom(e.target.value)
    }
    const priceTo = (e) => {
        sessionStorage.setItem("priceTo", e.target.value)
        setToFrom(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [From, To])


    return [category, brand, clickCategory, clickBrand, priceFrom, priceTo]
}

export default SidebarSearchHook