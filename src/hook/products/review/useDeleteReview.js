import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewOnProduct } from '../../../redux/actions/reviewActions';
import { toast } from 'react-toastify';
import {useJwt} from "react-jwt";

const useDeleteReview = (review) => {
    const dispatch = useDispatch();
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const {decodedToken, isExpired} = useJwt(localStorage.getItem("user"));

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const getUser = () => {
        return decodedToken && !isExpired ? decodedToken : null;
    };

    const user = getUser();

    useEffect(() => {
        if (review?.user?._id === user?.user?._id) {
            setIsUser(true);
        }
    }, [review, user]);

    const handleDelete = async () => {
        setLoading(true);
        await dispatch(deleteReviewOnProduct(review?.product, review?._id));
        setLoading(false);
        handleCloseDelete();
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

    return { isUser, handleDelete, handleShowDelete, handleCloseDelete, showDelete };
};

export default useDeleteReview;