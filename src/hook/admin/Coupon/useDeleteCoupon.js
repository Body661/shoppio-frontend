import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCoupon} from '../../../redux/actions/couponActions';
import {toast} from "react-toastify";

const useDeleteCoupon = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleDelete = async () => {
        setLoading(true)
        setIsSubmitted(true)
        await dispatch(deleteCoupon(id));
        setLoading(false)
        setIsSubmitted(false)
        handleModalClose();
    };

    const response = useSelector(state => state.couponReducer.deleteCoupon)


    useEffect(() => {
        if (!loading) {
            if (response && response?.status === 200) {
                toast("Coupon deleted successfully", {type: "success", toastId: "deleteCouponSuccess"})
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            } else {
                toast(
                    response?.data?.data?.errors
                        ? response?.data?.data?.errors[0]?.msg
                        : "Error while deleting coupon",
                    {type: "error", toastId: "deleteCouponError"}
                )
            }
        }
    }, [loading, response])
    return {isModalOpen, handleModalOpen, handleModalClose, handleDelete, loading, isSubmitted};
};

export default useDeleteCoupon;
