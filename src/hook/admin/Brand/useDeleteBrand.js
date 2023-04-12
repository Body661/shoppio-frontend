import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteBrand} from "../../../redux/actions/BrandActions";

const useDeleteBrand = (category) => {
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const deleteHandler = async () => {
        setIsPress(true)
        setIsModalOpen(false)
        await dispatch(deleteBrand(category))
        setLoading(false)
        setIsPress(false)
    }

    const deleteRes = useSelector(state => state.brandReducer.deleteBrand)

    console.log(deleteRes)
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
        deleteHandler,
        loading,
        isPress,
        isModalOpen,
        handleModalOpen,
        handleModalClose
    }
}

export default useDeleteBrand;