import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getWishlist} from '../../redux/actions/wishlistActions';


const ProductContainerHook = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [favProd, setFavProd] = useState([])
    const res = useSelector(state => state.wishlistReducer.allWishList)

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getWishlist())
            setLoading(false)
        }

        get();
    }, [])


    useEffect(() => {

        if (loading === false) {
            if (res.data?.length >= 1) {
                setFavProd(res.data?.map(item => item._id))
            } else setFavProd([])
        }

    }, [loading])

    return [favProd]

}

export default ProductContainerHook