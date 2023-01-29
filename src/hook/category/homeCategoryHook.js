import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllCategories} from "../../redux/actions/CategoryAction";

const HomeCategoryHook = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories(6))
    }, [dispatch])

    const categories = useSelector(state => state.allCategories.categories)
    const loading = useSelector(state => state.allCategories.loading)
    const error = useSelector(state => state.allCategories.error)

    return [categories, loading, error]
}

export default HomeCategoryHook