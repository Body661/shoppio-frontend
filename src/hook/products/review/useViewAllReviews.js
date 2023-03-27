import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allReviewProduct } from '../../../redux/actions/reviewActions';

const useViewAllReviews = (id) => {
    const dispatch = useDispatch();
    const allReviews = useSelector((state) => state.reviewReducer.allReviewProduct);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(false);
            await dispatch(allReviewProduct(id, 1, 5));
            setLoading(false);
        };

        fetchReviews();
    }, [id]);

    useEffect(() => {
        if (allReviews?.status !== 200 && !loading) setError(true);
    }, [allReviews, loading]);

    const onPress = async (page) => {
        setError(false);
        await dispatch(allReviewProduct(id, page, 5));
    };

    return { allReviews, onPress, loading, error };
};

export default useViewAllReviews;