import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteSubcategory} from "../../../redux/actions/SubcategoryActions";
import {toast} from "react-toastify";

const useDeleteSubcategory = (id) => {
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const dispatch = useDispatch()

    const [showDelete, setShowDelete] = useState(false);

    const handleOpenDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const handleDelete = async () => {
        setIsPress(true)
        setShowDelete(false)
        await dispatch(deleteSubcategory(id))
        setLoading(false)
        setIsPress(false)
    }

    const deleteRes = useSelector(state => state.subcategoryReducer.deleteSubcategory)

    useEffect(() => {
        if (!loading) {
            if (deleteRes && deleteRes?.status === 200) {
                toast("Subcategory deleted successfully", {type: "success", toastId: "deleteSubcategorySuccess"})
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            } else {
                toast(
                    deleteRes?.data?.data?.errors
                        ? deleteRes?.data?.data?.errors[0]?.msg
                        : "Error while deleting Subcategory",
                    {type: "error", toastId: "deleteSubcategoryError"}
                )
            }
        }
    }, [loading, deleteRes])


    return {
        handleDelete,
        loading,
        isPress,
        showDelete,
        handleOpenDelete,
        handleCloseDelete
    }
}

export default useDeleteSubcategory;