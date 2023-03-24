import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getWishlist} from '../../redux/actions/wishlistActions';


const useProductContainer = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [favProd, setFavProd] = useState([])

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
            setFavProd(res?.data?.data?.map(item => item._id))
        } else setFavProd([])

    }, [loading, res?.data?.data])

    return {favProd, loading}
}

export default useProductContainer