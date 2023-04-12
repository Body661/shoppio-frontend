import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory} from "../../../redux/actions/CategoryActions";
import {toast} from "react-toastify";

const useDeleteCategory = (category) => {
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const deleteHandler = async () => {
        setIsPress(true)
        setIsModalOpen(false)
        await dispatch(deleteCategory(category))
        setLoading(false)
        setIsPress(false)
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
        deleteHandler,
        loading,
        isPress,
        isModalOpen,
        handleModalOpen,
        handleModalClose
    }
}

export default useDeleteCategory;