import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {updateReviewOnProduct} from '../../redux/actions/reviewActions';

const EditReviewHook = (review) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    const [newRateText, setNewRateText] = useState(review.review);
    const [newRateValue, setNewRateValue] = useState(review.rating);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const onChangeRateText = (e) => {
        setNewRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setNewRateValue(val)
    }

    const handelEdit = async () => {
        setLoading(true)
        await dispatch(updateReviewOnProduct(review._id, {
            review: newRateText, rating: newRateValue
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
                notify("Error while updating review", "error")
            }

        }
    }, [loading])

    return [showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeRateText, newRateText, OnChangeRateValue, newRateValue]

}

export default EditReviewHook