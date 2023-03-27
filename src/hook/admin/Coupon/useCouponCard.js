import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCoupon } from '../../../redux/actions/couponActions';

const useCouponCard = (coupon) => {
    const dispatch = useDispatch();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleDelete = async () => {
        await dispatch(deleteCoupon(coupon?._id));
        handleModalClose();
        window.location.reload();
    };

    return { formatDate, isModalOpen, handleModalOpen, handleModalClose, handleDelete };
};

export default useCouponCard;
