import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCoupon, getAllCoupon} from '../../../redux/actions/couponActions';
import {toast} from "react-toastify";

const useAddCoupon = () => {
    const dispatch = useDispatch();
    const [couponName, setCouponName] = useState('');
    const [couponDate, setCouponDate] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPress, setIsPress] = useState(false);

    const onChangeName = (event) => {
        setCouponName(event.target.value);
    };

    const onChangeDate = (event) => {
        setCouponDate(event.target.value);
    };

    const onChangeValue = (event) => {
        setCouponValue(event.target.value);
    };

    const onSubmit = async () => {
        if (couponName.trim() === '' || couponDate.trim() === '' || couponValue <= 0) {
            toast('Please fill in all information!', {type: 'error'});
            return;
        }

        setIsPress(true)
        await dispatch(addCoupon({
            name: couponName,
            expire: couponDate,
            discount: couponValue,
        }));
        setIsPress(false)
        setLoading(false);
    };

    const addCouponRes = useSelector(state => state.couponReducer.addCoupon)

    useEffect(() => {
        if (loading === false && addCouponRes) {
            if (addCouponRes && addCouponRes.status === 201) {
                toast("Coupon added successfully", {type: 'success'});
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                toast(addCouponRes?.data?.errors ? addCouponRes?.data?.errors[0]?.msg : 'Error while adding Coupon', {
                    type: 'error',
                    toastId: 'addCouponError'
                });
            }
        }

    }, [loading, addCouponRes])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllCoupon());
        };

        fetchData();
    }, [dispatch]);

    const allCoupons = useSelector(state => state.couponReducer.allCoupons)

    let coupons = [];
    if (allCoupons?.data?.data) coupons = allCoupons?.data?.data

    return {
        couponName,
        couponDate,
        couponValue,
        onChangeName,
        onChangeDate,
        onChangeValue,
        onSubmit,
        coupons,
        loading,
        isPress
    };
};

export default useAddCoupon;