import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {createReview} from '../../redux/actions/reviewActions';

const AddReviewHook = (id) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [reviewTitle, setReviewTitle] = useState('')
    const [rateValue, setRateValue] = useState(5)
    const [loading, setLoading] = useState(true)

    const OnChangeReview = (e) => {
        setReview(e.target.value)
    }
    const OnChangeReviewTitle = (e) => {
        setReviewTitle(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setRateValue(val)
    }
    let user = null
    if (localStorage.getItem("user") != null) user = JSON.parse(localStorage.getItem("user"))

    const onSubmit = async () => {
        if (reviewTitle.trim() === "") {
            notify("Please write your review title", "error")
            return
        }

        if (review.trim() === "") {
            notify("Please write your review", "error")
            return
        }

        setLoading(true)
        await dispatch(createReview(id, {
            title: reviewTitle,
            description: review,
            ratings: rateValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.reviewReducer.createReview)
    const error = useSelector(state => state.reviewReducer.error)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                if (res.status && res.status === 201) {
                    notify("review added successfully", "success")
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
            }

            if (error) {
                if (error.status === 403) {
                    notify("Admins are not allowed to add reviews", "error")
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0].msg, "error");
                } else {
                    notify("Error while adding the review", "error");
                }
            }
        }

        return function cleanup() {};
    }, [loading])

    return [OnChangeReview, OnChangeRateValue, review, reviewTitle, OnChangeReviewTitle, rateValue, user, onSubmit]
}

export default AddReviewHook