import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import notify from '../useNotification'
import {applyCartCoupon} from '../../redux/actions/cartActions';


const ApplyCouponHook = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('')
    const [loading, setLoading] = useState(true)

    const onChangeCoupon = (e) => {
        setCouponName(e)
    }

    const handelSubmitCoupon = async () => {
        if (couponName.trim() === "") {
            notify("Please enter coupon name", "warn")
            return
        }
        setLoading(true)
        await dispatch(applyCartCoupon({
            coupon: couponName
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.cartReducer.applyCoupon)
    const error = useSelector(state => state.cartReducer.error)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("Coupon applied successfully", "success")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);

            }

            if (error) {
                if (error.status === 401) {
                    notify("you are not logged in!", "error")
                } else if (error.status === 403) {
                    notify("You are not allowed to do this operation", "error");
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0]?.msg, "error");
                } else {
                    notify("Error while applying coupon to cart", "warn")
                }
            }
        }
    }, [loading])


    return [couponName, onChangeCoupon, handelSubmitCoupon]

}
export default ApplyCouponHook