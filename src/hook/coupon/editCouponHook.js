import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {editCoupon, getOneCoupon} from '../../redux/actions/couponActions';
import notify from '../useNotification';

const EditCouponHook = (id) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [couponName, setCouponName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState(true)

    const oneCoupon = useSelector(state => state.couponReducer.oneCoupon)

    useEffect(() => {
        const get = async () => {
            setLoadingData(true)
            await dispatch(getOneCoupon(id))
            setLoadingData(false)
        }
        get();
    }, [])

    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "numeric", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        if (loadingData === false) {
            if (oneCoupon?.data) {
                setCouponName(oneCoupon?.data?.name)
                setCouponDate(formatDate(oneCoupon?.data?.expire))
                setCouponValue(oneCoupon?.data?.discount)
            }
        }
    }, [loadingData])


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
        await dispatch(editCoupon(id, {
            name: couponName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.editCoupon)
    const error = useSelector(state => state.couponReducer.error)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("Coupon updated successfully", "success")
                setTimeout(() => {
                    navigate('/admin/addCoupon')
                }, 1000);
            }

            if (error) {
                if (error?.status === 401) {
                    notify("You are not logged in!", "error")
                } else if (error?.status === 403) {
                    notify("You are not allowed to do this operation", "error");
                } else if (error?.data?.errors) {
                    notify(error?.data?.errors[0]?.msg, "error");
                } else {
                    notify("Error while updating coupon", "error")
                }
            }
        }

    }, [loading])


    return [couponName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit]
}


export default EditCouponHook