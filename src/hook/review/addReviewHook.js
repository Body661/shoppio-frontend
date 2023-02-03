import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {createReview} from '../../redux/actions/reviewActions';

const AddReviewHook = (id) => {
    const dispatch = useDispatch();
    const [rateText, setRateText] = useState('')
    const [rateValue, setRateValue] = useState(0)
    const [loading, setLoading] = useState(true)

    const OnChangeRateText = (e) => {
        setRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setRateValue(val)
    }
    let user = ""
    if (localStorage.getItem("user") != null) user = JSON.parse(localStorage.getItem("user"))

    const onSubmit = async () => {
        if (rateText.trim() === "") {
            notify("Please write your review", "error")
            return
        }
        setLoading(true)
        await dispatch(createReview(id, {
            review: rateText,
            rating: rateValue
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
                if (error.status && error.status === 403) {
                    notify("Admins are not allowed to add reviews", "error")
                } else if (error.data?.errors && error.data?.errors[0].msg === "You have already reviewed") {
                    notify("You have already reviewed", "error")
                }
                if (error.status === 401) {
                    notify("Please login in to review", "error")
                }
            }
        }
    }, [loading])

    return [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit]
}

export default AddReviewHook