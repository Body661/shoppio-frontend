import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {getAllUserCartItems} from '../../redux/actions/cartActions';

const GetUserCartHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemsNum, setItemsNum] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [couponNameRes, setCouponName] = useState('')
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] = useState(0)
    const [cartID, setCartID] = useState('')

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getAllUserCartItems())
            setLoading(false)
        }
        get()
    }, [])

    const res = useSelector(state => state.cartReducer.userCart)

    useEffect(() => {
        if (loading === false) {
            if (res && res?.data?.data) {
                setItemsNum(res?.data?.data?.cartItems?.length)
                setCartItems(res?.data?.data?.cartItems)
                setTotalCartPrice(res?.data?.data?.totalCartPrice)
                setCartID(res?.data?.data?._id)

                if (res?.data?.data?.coupon) {
                    setCouponName(res?.data?.data?.coupon)
                } else {
                    setCouponName('')
                }
                if (res?.data?.data?.totalPriceAfterDiscount) {
                    setTotalCartPriceAfterDiscount(res?.data?.data?.totalPriceAfterDiscount)
                } else {
                    setTotalCartPriceAfterDiscount(0)
                }

            } else {
                setCouponName('')
                setTotalCartPriceAfterDiscount(0)
                setItemsNum(0)
                setCartItems([])
                setTotalCartPrice(0)
            }

        }
    }, [loading])

    return [itemsNum, cartItems, totalCartPrice, couponNameRes, totalCartPriceAfterDiscount, cartID]
}

export default GetUserCartHook