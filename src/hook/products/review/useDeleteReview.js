import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewOnProduct } from '../../../redux/actions/reviewActions';
import { toast } from 'react-toastify';

const useDeleteReview = (review) => {
    const dispatch = useDispatch();
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);

    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);

    const getUser = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    const user = getUser();

    useEffect(() => {
        if (review?.user?._id === user?._id) {
            setIsUser(true);
        }
    }, [review, user]);

    const handleDelete = async () => {
        setLoading(true);
        await dispatch(deleteReviewOnProduct(review?.product, review?._id));
        setLoading(false);
        handleClose();
    };

    const res = useSelector((state) => state.reviewReducer.deleteReview);

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                toast('review deleted successfully', { type: 'success' });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                toast( res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while deleting the review', {
                    type: 'error',
                    toastId: 'deleteReviewError',
                });
            }
        }
    }, [loading, res]);

    return { isUser, handleDelete, handleShow, handleClose, showDelete };
};

export default useDeleteReview;