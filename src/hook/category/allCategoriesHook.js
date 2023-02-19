import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllCategories, getAllCategoriesPage} from "../../redux/actions/CategoryActions";

export const AllCategoriesHook = () => {
    const dispatch = useDispatch();
    //when first load
    useEffect(() => {
        dispatch(getAllCategories(6));
    }, [])

    //to get state from redux
    const categories = useSelector(state => state.allCategories.categories)
    const loading = useSelector(state => state.allCategories.loading)
    const error = useSelector(state => state.allCategories.error)

    //to get page count
    let pageCount = 0;
    if (categories.paginationRes) pageCount = categories.paginationRes.pages

    //when press pagination
    const getPage = (page) => {
        dispatch(getAllCategoriesPage(page));
    }

    return [categories, loading, pageCount, getPage, error]

}