import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {updateReviewOnProduct} from '../../redux/actions/reviewActions';

const EditReviewHook = (review) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [newReview, setNewReview] = useState(review?.description)
    const [newReviewTitle, setNewReviewTitle] = useState(review?.title)
    const [newRateValue, setNewRateValue] = useState(review?.ratings)

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const onChangeReviewTitle = (e) => {
        setNewReviewTitle(e.target.value)
    }

    const onChangeReview = (e) => {
        setNewReview(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setNewRateValue(val)
    }

    const handelEdit = async () => {
        if (newReviewTitle.trim() === "") {
            notify("Please write your review title", "error")
            return
        }

        if (newReview.trim() === "") {
            notify("Please write your review", "error")
            return
        }


        await dispatch(updateReviewOnProduct(review?.product, review?._id, {
            title: newReviewTitle,
            description: newReview,
            ratings: newRateValue
        }))
        setLoading(false)
        handleCloseEdit();
    }
    const res = useSelector(state => state.reviewReducer.updateReview)
    const error = useSelector(state => state.reviewReducer.error)

    useEffect(() => {
        if (loading === false) {
            if (res.status && res.status === 200) {
                notify("Review updated successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }

            if (error) {
                if (error?.data?.errors) {
                    notify(error?.data?.errors[0].msg, "error");
                } else {
                    notify("Error while updating review", "error")
                }
            }

        }

        return function cleanup() {};
    }, [loading])

    return [showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeReview, newReview, newReviewTitle, onChangeReviewTitle, OnChangeRateValue, newRateValue]

}

export default EditReviewHook