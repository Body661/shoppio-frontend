import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {deleteReviewOnProduct} from '../../redux/actions/reviewActions';

const DeleteReviewHook = (review) => {
    const dispatch = useDispatch();
    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(true)

    const [showDelete, setShowDelete] = useState(false);
    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);

    let user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        if (review?.user?._id === user?._id) {
            setIsUser(true);
        }
    }, [])


    const handelDelete = async () => {
        setLoading(true)
        await dispatch(deleteReviewOnProduct(review?.product, review?._id))
        setLoading(false)
        handleClose();
    }
    const res = useSelector(state => state.reviewReducer.deleteReview)
    const error = useSelector(state => state.reviewReducer.error)

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 200) {
                notify("Review deleted successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }

            if (error) {
                notify("Error while deleting review", "error")
            }
        }
    }, [loading])

    return [isUser, handelDelete, handleShow, handleClose, showDelete]
}

export default DeleteReviewHook