import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {addCoupon, getAllCoupon} from '../../redux/actions/couponActions';
import notify from '../useNotification';

const AddCouponHook = () => {
    const dispatch = useDispatch()
    const [couponName, setCouponName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)


    const onChangeName = (event) => {
        event.persist();
        setCouponName(event.target.value)
    }

    const onChangeDate = (event) => {
        event.persist();
        setCouponDate(event.target.value)

    }
    const onChangeValue = (event) => {
        event.persist();
        setCouponValue(event.target.value)
    }

    const onSubmit = async () => {
        if (couponName.trim() === "" || couponDate.trim() === "" || couponValue <= 0) {
            notify("Please fill in all information!", "warn")
            return
        }

        setLoading(true)
        await dispatch(addCoupon({
            name: couponName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.addCoupon)
    const error = useSelector(state => state.couponReducer.error)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 201) {
                notify("Coupon added successfully", "success")
                window.location.reload()
            }

            if (error) {
                if (error?.status === 401) {
                    notify("You are not logged in!", "error")
                } else if (error?.status === 403) {
                    notify("You are not allowed to do this operation", "error");
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0]?.msg, "error");
                } else {
                    notify("Error while removing product from wishlist", "error")
                }
            }

        }

    }, [loading])


    useEffect(() => {
        const get = async () => {
            await dispatch(getAllCoupon())
        }
        get();
    }, [])


    const allCoupons = useSelector(state => state.couponReducer.allCoupons)

    let coupons = []

    try {
        if (allCoupons && allCoupons.data.length >= 1)
            coupons = allCoupons.data
    } catch (e) {
    }

    return [couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, coupons]
}

export default AddCouponHook