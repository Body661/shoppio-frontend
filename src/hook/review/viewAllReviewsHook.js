import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {allReviewProduct} from '../../redux/actions/reviewActions';

const ViewAllReviewsHook = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    const allReview = useSelector((state) => state.reviewReducer.allReviewProduct)
    const error = useSelector((state) => state.reviewReducer.error)

    useEffect(() => {
        setLoading(true)
        dispatch(allReviewProduct(id, 1, 5))
        setLoading(false)
    }, [])

    const onPress = async (page) => {
        await dispatch(allReviewProduct(id, page, 5))
    }

    return [allReview, onPress,loading, error]
}

export default ViewAllReviewsHook