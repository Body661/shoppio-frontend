import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory} from "../../../redux/actions/CategoryActions";
import {toast} from "react-toastify";

const useDeleteCategory = (category) => {
    const [loading, setLoading] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const dispatch = useDispatch()

    const [showDelete, setShowDelete] = useState(false);

    const handleOpenDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const handleDelete = async () => {
        setIsSubmitted(true)
        setShowDelete(false)
        await dispatch(deleteCategory(category))
        setLoading(false)
        setIsSubmitted(false)
    }

    const deleteRes = useSelector(state => state.categoryReducer.deleteCategory)

    useEffect(() => {
        if (!loading) {
            if (deleteRes && deleteRes?.status === 200) {
                toast("Category deleted successfully", {type: "success", toastId: "deleteCategorySuccess"})
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                toast(
                    deleteRes?.data?.data?.errors
                        ? deleteRes?.data?.data?.errors[0]?.msg
                        : "Error while deleting category",
                    {type: "error", toastId: "deleteCategoryError"}
                )
            }
        }
    }, [loading, deleteRes])


    return {
        handleDelete,
        loading,
        isSubmitted,
        showDelete,
        handleOpenDelete,
        handleCloseDelete
    }
}

export default useDeleteCategory;