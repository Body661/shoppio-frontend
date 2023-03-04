import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllCategories} from "../../redux/actions/CategoryActions";

const UseHomeCategories = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(getAllCategories(6))
    }, [dispatch])

    const categories = useSelector(state => state.allCategories.categories)

    useEffect(() => {
        if (categories && categories?.status !== 200) setError(true)
        setLoading(false);
    }, [categories])

    return {categories: categories?.data?.data, loading, error}
}

export default UseHomeCategories