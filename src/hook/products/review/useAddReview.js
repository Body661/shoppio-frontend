import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createReview} from '../../../redux/actions/reviewActions';
import {toast} from 'react-toastify';
import {useJwt} from "react-jwt";

const useAddReview = (id) => {
    const dispatch = useDispatch();
    const {decodedToken, isExpired} = useJwt(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
        review: '',
        reviewTitle: '',
        rate: 0,
        loading: true,
    });

    const handleChangeReview = (e, field) => {
        setFormData({...formData, [field]: e.target.value});
    };

    const handleChangeRate = (val) => {
        setFormData({...formData, rate: val});
    };

    const getUser = () => {
        return decodedToken && !isExpired ? decodedToken?.user : null;
    };

    const user = getUser();

    const handleSubmit = async () => {
        if (formData.reviewTitle.trim() === '') {
            toast('Please write your review title', {type: 'error'});
            return;
        }

        if (formData.review.trim() === '') {
            toast('Please write your review', {type: 'error'});
            return;
        }

        setFormData({...formData, loading: true});
        await dispatch(
            createReview(id, {
                title: formData.reviewTitle,
                description: formData.review,
                ratings: formData.rate,
            })
        );
        setFormData({...formData, loading: false});
    };

    const res = useSelector((state) => state.reviewReducer.createReview);

    useEffect(() => {
        if (formData.loading === false) {
            if (res && res.status === 201) {
                toast('review added successfully', {type: 'success'});
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (res?.status === 401) {
                toast("You are not logged in, please login first", {type: 'error', toastId: 'addReviewLogin'})
            } else if (res?.data?.error?.name === 'JsonWebTokenError') {
                toast("You are not logged in, please login first", {
                    type: 'error',
                    toastId: 'addReviewError',
                });
            } else {
                toast(res?.data?.errors ? res?.data?.errors[0]?.msg : 'Error while adding the review', {
                    type: 'error',
                    toastId: 'addReviewError',
                });
            }
        }

        return function cleanup() {
        };
    }, [formData.loading, res]);

    return {
        handleChangeReview,
        handleChangeRate,
        formData,
        user,
        handleSubmit,
    };
};

export default useAddReview;
