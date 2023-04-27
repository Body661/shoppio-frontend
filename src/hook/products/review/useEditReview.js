import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviewOnProduct } from '../../../redux/actions/reviewActions';
import { toast } from 'react-toastify';

const useEditReview = (review) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        newReview: review?.description,
        newReviewTitle: review?.title,
        newRate: review?.ratings,
    });

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const handleChangeReview = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleEdit = async () => {
        if (formData.newReviewTitle.trim() === '') {
            toast('Please write your review title', { type: 'error' });
            return;
        }

        if (formData.newReview.trim() === '') {
            toast('Please write your review', { type: 'error' });
            return;
        }

        await dispatch(
            updateReviewOnProduct(review?.product, review?._id, {
                title: formData.newReviewTitle,
                description: formData.newReview,
                ratings: formData.newRate,
            }),
        );
        setLoading(false);
        handleCloseEdit();
    };

    const res = useSelector((state) => state.reviewReducer.updateReview);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                toast('review updated successfully', { type: 'success' });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast( res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while updating the review', {
                    type: 'error',
                    toastId: 'updateReviewError',
                });
            }
        }

        return function cleanup() {};
    }, [res, loading]);

    return {
        showEdit,
        handleCloseEdit,
        handleShowEdit,
        handleEdit,
        handleChangeReview,
        formData,
    };
};

export default useEditReview;