import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReviews } from '../../../redux/actions/reviewActions';

const useGetProductReviews = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(false);
            await dispatch(getProductReviews(id, 1, 5));
            setLoading(false);
        };

        fetchReviews();
    }, [id]);

    const reviews = useSelector((state) => state.reviewReducer.getProductReviews);

    useEffect(() => {
        if (reviews?.status !== 200 && !loading) setError(true);
    }, [reviews, loading]);

    const handleChangePage = async (page) => {
        setError(false);
        await dispatch(getProductReviews(id, page, 5));
    };

    return { reviews, handleChangePage, loading, error };
};

export default useGetProductReviews;