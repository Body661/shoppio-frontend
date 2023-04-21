import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteBrand} from "../../../redux/actions/BrandActions";

const useDeleteBrand = (category) => {
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const dispatch = useDispatch()

    const [showDelete, setShowDelete] = useState(false);

    const handleOpenDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);

    const handleDelete = async () => {
        setIsPress(true)
        setShowDelete(false)
        await dispatch(deleteBrand(category))
        setLoading(false)
        setIsPress(false)
    }

    const deleteRes = useSelector(state => state.brandReducer.deleteBrand)

    useEffect(() => {
        if (!loading) {
            if (deleteRes && deleteRes?.status === 200) {
                toast("Brand deleted successfully", {type: "success", toastId: "deleteBrandSuccess"})
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                toast(
                    deleteRes?.data?.data?.errors
                        ? deleteRes?.data?.data?.errors[0]?.msg
                        : "Error while deleting Brand",
                    {type: "error", toastId: "deleteBrandError"}
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

export default useDeleteBrand;