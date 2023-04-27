import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getWishlist} from '../../redux/actions/wishlistActions';


const useProductContainer = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [isFavProduct, setIsFavProduct] = useState([])

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getWishlist())
            setLoading(false)
        }

        get();
    }, [])

    const res = useSelector(state => state.wishlistReducer.allWishList)

    useEffect(() => {

        if (loading === false && res?.data?.data?.length >= 1) {
            setIsFavProduct(res?.data?.data?.map(item => item?._id))
        } else setIsFavProduct([])

    }, [loading, res?.data?.data])

    return {isFavProduct, loading}
}

export default useProductContainer